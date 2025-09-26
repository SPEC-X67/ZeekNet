# ZeekNet Job Portal - Server

A robust Node.js/TypeScript backend API for the ZeekNet Job Portal, built with clean architecture principles and modern technologies.

## 🏗️ Architecture

This project follows **Clean Architecture** principles with clear separation of concerns:

```
src/
├── domain/           # Business logic and entities
├── application/      # Use cases and application services
├── infrastructure/   # External concerns (DB, APIs, etc.)
└── presentation/     # Controllers and routes
```

## 🚀 Features

- **Authentication & Authorization**
  - JWT-based authentication with access/refresh tokens
  - Google OAuth integration
  - Role-based access control (Admin, Company, User)
  - Password reset with OTP

- **User Management**
  - User registration and profile management
  - Admin user management capabilities
  - Company profile setup and verification

- **Security**
  - Password hashing with bcrypt
  - Helmet for security headers
  - CORS configuration
  - Input validation with Zod

- **Database & Caching**
  - MongoDB with Mongoose ODM
  - Redis for session management and OTP storage
  - AWS S3 for file storage

- **Email Services**
  - Nodemailer integration
  - Email templates for verification and notifications

## 🛠️ Tech Stack

- **Runtime**: Node.js
- **Language**: TypeScript
- **Framework**: Express.js
- **Database**: MongoDB
- **Cache**: Redis
- **Authentication**: JWT + Google OAuth
- **File Storage**: AWS S3
- **Email**: Nodemailer
- **Validation**: Zod
- **DI Container**: Inversify
- **Security**: Helmet, bcryptjs

## 📋 Prerequisites

- Node.js (v18 or higher)
- MongoDB
- Redis
- AWS S3 account (for file storage)

## 🚀 Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Environment Setup

Copy the environment example file and configure your variables:

```bash
cp env.example .env
```

Update the `.env` file with your configuration:

```env
# Server Configuration
PORT=4000

# Database
MONGO_URI=mongodb://localhost:27017/zeeknet-job-portal

# JWT Secrets (Generate strong secrets)
JWT_ACCESS_SECRET=your-strong-access-secret
JWT_REFRESH_SECRET=your-strong-refresh-secret

# Redis Configuration
REDIS_URL=redis://127.0.0.1:6379

# Email Configuration
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-password

# Google OAuth
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret

# AWS S3
AWS_ACCESS_KEY_ID=your-aws-access-key
AWS_SECRET_ACCESS_KEY=your-aws-secret-key
AWS_REGION=us-east-1
AWS_S3_BUCKET_NAME=your-bucket-name

# Frontend URL
FRONTEND_URL=http://localhost:3000
```

### 3. Start Development Server

```bash
# Development mode with hot reload
npm run dev

# Build and start production
npm run build
npm start
```

## 📚 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/google` - Google OAuth login
- `POST /api/auth/forgot-password` - Request password reset
- `POST /api/auth/reset-password` - Reset password
- `POST /api/auth/refresh` - Refresh access token
- `POST /api/auth/logout` - User logout

### Company Management
- `POST /api/company/profile` - Create/update company profile
- `GET /api/company/profile` - Get company profile
- `POST /api/company/upload-logo` - Upload company logo

### Admin
- `GET /api/admin/companies` - Get all companies
- `PUT /api/admin/companies/:id/status` - Update company status
- `GET /api/admin/users` - Get all users
- `PUT /api/admin/users/:id` - Update user details

## 🏃‍♂️ Available Scripts

```bash
# Development
npm run dev          # Start development server with nodemon

# Production
npm run build        # Build TypeScript to JavaScript
npm start           # Start production server

# Code Quality
npm run lint        # Run ESLint
```

## 🗂️ Project Structure

```
server/
├── src/
│   ├── domain/                 # Business logic layer
│   │   ├── entities/          # Domain entities
│   │   ├── enums/            # Domain enums
│   │   ├── repositories/      # Repository interfaces
│   │   ├── services/         # Domain services
│   │   └── value-objects/    # Value objects
│   ├── application/           # Application layer
│   │   ├── dto/              # Data Transfer Objects
│   │   ├── interfaces/       # Service interfaces
│   │   ├── services/         # Application services
│   │   └── use-cases/        # Use case implementations
│   ├── infrastructure/        # Infrastructure layer
│   │   ├── config/           # Configuration
│   │   ├── database/         # Database connections
│   │   ├── external-services/ # External API integrations
│   │   ├── messaging/        # Email services
│   │   └── security/         # Security utilities
│   └── presentation/         # Presentation layer
│       ├── controllers/      # HTTP controllers
│       ├── middleware/       # Express middleware
│       ├── routes/           # API routes
│       └── validators/       # Request validators
├── package.json
├── tsconfig.json
└── README.md
```

## 🔧 Configuration

### Database Models
- **User**: User accounts and profiles
- **Company**: Company information and verification status
- **Admin**: Administrative users

### Security Features
- JWT token-based authentication
- Password hashing with bcrypt
- CORS protection
- Security headers with Helmet
- Input validation and sanitization

### File Upload
- AWS S3 integration for file storage
- Multer for handling multipart/form-data
- Image optimization and validation

## 🧪 Testing

```bash
# Run tests (when implemented)
npm test

# Run tests with coverage
npm run test:coverage
```

## 📦 Deployment

### Environment Variables
Ensure all required environment variables are set in your production environment.

### Build Process
```bash
npm run build
npm start
```

### Docker (Optional)
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY dist ./dist
EXPOSE 4000
CMD ["npm", "start"]
```
