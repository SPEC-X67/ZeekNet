# ZeekNet - Job Portal Platform

ZeekNet is a full-stack job portal platform built using Clean Architecture principles. It connects job seekers with hiring companies, offering real-time candidate evaluation, automated resume scoring, candidate pipeline management, and subscription features.

---

## Key Features

### For Job Seekers
- **Job Search**: Filtering by role, skills, location, and salary ranges.
- **Application Tracking**: Real-time status updates on submitted applications.
- **Digital Resume**: Profile builder with work experience, education, and skills.
- **Real-Time Communication**: Messaging interface powered by Socket.io.

### For Companies
- **Applicant Tracking System (ATS)**: Pipeline management, interview scheduling, and AI-assisted candidate evaluation.
- **Company Verification**: Multi-stage business license verification.
- **Subscription Management**: Tiered employer plans integrated with Stripe.
- **Job Management**: Create, publish, close, and feature job openings.

### For Administrators
- **Platform Management**: User moderation, company verification workflows, and system analytics.
- **Content Moderation**: Management of job categories, skills, and system roles.

---

## Architecture & Tech Stack

### Frontend
- **Framework**: React 19 with Vite & TypeScript
- **State Management**: Redux Toolkit (RTK)
- **Styling**: Tailwind CSS, Framer Motion, Radix UI Primitives

### Backend
- **Architecture**: Clean Architecture (Domain, Use Cases, Infrastructure, Presentation)
- **Runtime**: Node.js, Express.js with TypeScript
- **Database**: MongoDB (Mongoose ORM), Redis (Caching & Sessions)
- **Storage & Messaging**: AWS S3, Socket.io, Nodemailer, Stripe, Groq AI

### Infrastructure
- **Containerization**: Docker, Docker Compose v2
- **Reverse Proxy**: Nginx Proxy with Automated Let's Encrypt SSL/TLS
- **CI/CD**: GitHub Actions & GitHub Container Registry (`ghcr.io`)
- **Hosting**: AWS EC2

---

## Clean Architecture Structure

```text
ZeekNet/
├── client/              # Vite React Frontend
└── server/              # Node.js TypeScript Backend
    └── src/
        ├── domain/          # Entities & Business Interfaces
        ├── application/     # Use Cases & Validation Schemas
        ├── infrastructure/  # DB Repositories, Caching & External APIs
        └── presentation/    # Express Controllers, Routes & Middleware
```

---

## Local Development

### Prerequisites
- Node.js v18 or later
- MongoDB Atlas or local MongoDB instance
- Redis server instance

### Setup Instructions

1. **Clone Repository**
   ```bash
   git clone https://github.com/shamnxd/ZeekNet.git
   cd ZeekNet
   ```

2. **Configure Environment Variables**
   Copy `.env.example` to `.env` in the root directory and update with your local development credentials:
   ```bash
   cp .env.example .env
   ```

3. **Install Dependencies & Start Application**
   ```bash
   # Terminal 1: Backend Server
   cd server
   npm install
   npm run dev

   # Terminal 2: Frontend Client
   cd ../client
   npm install
   npm run dev
   ```

---

## Deployment

Refer to the complete [DEPLOYMENT.md](DEPLOYMENT.md) guide for instructions on configuring Docker, Redis, central Nginx proxy, SSL certificates, and automated GitHub Actions CI/CD workflows on AWS EC2.

---

## License

This project is licensed under the ISC License.
