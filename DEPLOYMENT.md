# ZeekNet - Production Deployment Guide

This document provides a comprehensive guide for deploying the ZeekNet application stack using Docker, Redis, an Nginx reverse proxy with automated SSL/TLS certificates, and GitHub Actions CI/CD.

---

## 1. System Architecture

The deployment architecture utilizes Docker containers isolated across bridge networks (`web-network` and `zeeknet-internal`), orchestrated behind a central reverse proxy.

```
[ Internet Client ]
       |
       v
[ AWS EC2 Port 80 / 443 ]
       |
       +---> [ nginx-proxy & acme-companion ]
                   |
                   +---> [ zeeknet-frontend (Port 80)  ] -- (web-network)
                   |
                   +---> [ zeeknet-backend  (Port 4000) ] -- (web-network & zeeknet-internal)
                               |
                               +---> [ zeeknet-redis (Port 6379) ] -- (zeeknet-internal)
```

### Components
- **Central Reverse Proxy**: `nginx-proxy` monitors running Docker containers and routes incoming web traffic based on environment variables.
- **Automated SSL/TLS**: `acme-companion` manages Let's Encrypt certificates automatically for all exposed domains.
- **Frontend Container**: Multi-stage Nginx container serving built React SPA assets.
- **Backend Container**: Node.js/TypeScript runtime executing Clean Architecture Express REST API.
- **Redis Cache**: In-memory Redis store isolated on a private internal bridge network (`zeeknet-internal`).

---

## 2. Prerequisites

### Infrastructure Requirements
- AWS EC2 Instance running Ubuntu 22.04 or 24.04 LTS.
- Allocated Elastic IP assigned to the EC2 instance.
- DNS `A` records pointing your domain (e.g., `zeeknet.shamnadt.in`) to the EC2 Elastic IP.

### Security Group Inbound Rules
- `HTTP` (Port 80) from `0.0.0.0/0`
- `HTTPS` (Port 443) from `0.0.0.0/0`
- `SSH` (Port 22) from authorized IP addresses

### Server Dependencies
Install Docker Engine and Docker Compose v2 on the EC2 host:

```bash
# Update system packages
sudo apt update && sudo apt upgrade -y

# Install Docker
sudo apt install -y docker.io

# Install Docker Compose v2 plugin
sudo mkdir -p /usr/local/lib/docker/cli-plugins
sudo curl -SL https://github.com/docker/compose/releases/download/v2.27.0/docker-compose-linux-x86_64 -o /usr/local/lib/docker/cli-plugins/docker-compose
sudo chmod +x /usr/local/lib/docker/cli-plugins/docker-compose

# Verify installation
docker compose version
```

---

## 3. Central Reverse Proxy Setup

The central proxy must be running before starting individual application stacks.

### Step 1: Create Docker Network
```bash
docker network create web-network
```

### Step 2: Configure Central Proxy Stack
Create directory `~/nginx-proxy` and add `docker-compose.yml`:

```yaml
version: '3.8'

services:
  nginx-proxy:
    image: nginxproxy/nginx-proxy
    container_name: nginx-proxy
    restart: always
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - conf:/etc/nginx/conf.d
      - vhost:/etc/nginx/vhost.d
      - html:/usr/share/nginx/html
      - certs:/etc/nginx/certs:ro
      - /var/run/docker.sock:/tmp/docker.sock:ro
    networks:
      - web-network

  acme-companion:
    image: nginxproxy/acme-companion
    container_name: nginx-proxy-acme
    restart: always
    volumes_from:
      - nginx-proxy
    volumes:
      - certs:/etc/nginx/certs:rw
      - acme:/etc/acme.sh
      - /var/run/docker.sock:/var/run/docker.sock:ro
    environment:
      - DEFAULT_EMAIL=your-email@example.com

networks:
  web-network:
    external: true

volumes:
  conf:
  vhost:
  html:
  certs:
  acme:
```

### Step 3: Start Central Proxy
```bash
cd ~/nginx-proxy
docker compose up -d
```

---

## 4. Application Environment Configuration

Create a `.env` file inside `~/apps/ZeekNet/.env` on the EC2 host:

```env
# Docker & Reverse Proxy Domain Settings
REGISTRY_OWNER=your_github_username
VIRTUAL_HOST=zeeknet.yourdomain.com
LETSENCRYPT_HOST=zeeknet.yourdomain.com

# Server Environment
NODE_ENV=production
PORT=4000
MONGO_URI=mongodb+srv://user:pass@cluster.mongodb.net/zeeknet?retryWrites=true&w=majority

JWT_ACCESS_SECRET=your_access_secret
JWT_REFRESH_SECRET=your_refresh_secret
BCRYPT_SALT_ROUNDS=10
JWT_ACCESS_EXPIRES_IN=15m
JWT_REFRESH_EXPIRES_IN=7d

REDIS_URL=redis://zeeknet-redis:6379
OTP_TTL_SECONDS=300

COOKIE_NAME_REFRESH=refresh_token
COOKIE_SECURE=true
COOKIE_SAME_SITE=lax

EMAIL_USER=your_email@gmail.com
EMAIL_PASSWORD=your_app_password

GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

AWS_ACCESS_KEY_ID=your_aws_access_key
AWS_SECRET_ACCESS_KEY=your_aws_secret_key
AWS_REGION=ap-southeast-2
AWS_S3_BUCKET_NAME=your_s3_bucket

FRONTEND_URL=https://zeeknet.yourdomain.com
LOG_RETENTION_DAYS=30
LOG_LEVEL=info

STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret
GROQ_API_KEY=your_groq_api_key

# Client Environment
VITE_API_URL=https://zeeknet.yourdomain.com
VITE_GOOGLE_CLIENT_ID=your_google_client_id
VITE_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
```

---

## 5. Deployment Options

### Option A: Automated CI/CD (GitHub Actions)

1. Add the following Repository Secrets in GitHub (`Settings -> Secrets and variables -> Actions`):
   - `EC2_HOST`: Elastic IP address of your EC2 instance.
   - `EC2_USERNAME`: SSH username (`ubuntu`).
   - `EC2_SSH_KEY`: Content of your private SSH key (`.pem`).

2. Push code to the `main` branch. GitHub Actions will build Docker images, publish them to GitHub Container Registry (`ghcr.io`), connect via SSH to EC2, pull updated images, and restart application containers.

### Option B: Manual Server Deployment

To deploy manually on the EC2 server:

```bash
cd ~/apps/ZeekNet
git pull origin main
export REGISTRY_OWNER=your_github_username
docker compose pull
docker compose down --remove-orphans || true
docker compose up -d --remove-orphans
```

---

## 6. Maintenance & Diagnostics

### View Running Containers
```bash
docker ps
```

### Inspect Container Logs
```bash
# View proxy logs
docker logs --tail 50 nginx-proxy

# View application backend logs
docker logs --tail 50 zeeknet-backend

# View application frontend logs
docker logs --tail 50 zeeknet-frontend

# View redis cache logs
docker logs --tail 50 zeeknet-redis
```

### Verify Proxy Route Generation
```bash
docker exec nginx-proxy cat /etc/nginx/conf.d/default.conf | grep zeeknet
```

---

## 7. Troubleshooting

### 404 Not Found
- Ensure `~/apps/ZeekNet/.env` exists and contains correct `VIRTUAL_HOST` and `LETSENCRYPT_HOST`.
- Verify the container is attached to `web-network`.

### Cannot POST //auth/login
- Ensure `VIRTUAL_DEST=/api` is set on `zeeknet-backend` in `docker-compose.yml`.
- Ensure `VIRTUAL_PATH` and `VIRTUAL_DEST` are NOT defined inside `.env` to prevent frontend container inheritance.
