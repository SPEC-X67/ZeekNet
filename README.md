# ZeekNet - Job Portal Platform

A modern, full-stack job portal application built with **React**, **TypeScript**, **Node.js**, and **MongoDB**. ZeekNet connects job seekers with companies, providing a comprehensive platform for job listings, applications, and company verification.

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running the Application](#running-the-application)
- [Development](#development)
- [API Documentation](#api-documentation)
- [Project Architecture](#project-architecture)
- [Contributing](#contributing)
- [License](#license)

## 🎯 Overview

ZeekNet is a comprehensive job portal platform designed to streamline the recruitment process. The platform supports three main user roles:

- **Job Seekers**: Browse and apply for jobs, manage applications, and build their professional profile
- **Companies**: Post job listings, manage applicants, and verify their business information
- **Administrators**: Oversee platform operations, manage user verification, and monitor system health

## ✨ Features

### For Job Seekers
- 🔍 Advanced job search and filtering
- 📋 Job application management
- 👤 Professional profile creation and management
- 🔔 Real-time notifications for application updates
- 💼 Application history and status tracking

### For Companies
- 📝 Create and manage job postings
- 👥 Review applicants and manage applications
- ✅ Company verification process
- 📊 Dashboard with application statistics
- 🔔 Notifications for new applications

### For Administrators
- 🛡️ User and company verification management
- 📊 Platform analytics and monitoring
- 👮 Content moderation and oversight
- 🔧 System configuration and maintenance

### General Features
- 🔐 Secure authentication (JWT-based)
- 🌐 Real-time updates using WebSockets (Socket.io)
- 🖼️ Image upload and cropping functionality
- 📱 Responsive design with Tailwind CSS
- 🎨 Modern UI components (Radix UI)
- 🔄 State management with Redux Toolkit
- 📧 Email notifications
- ☁️ AWS S3 integration for file storage

## 🛠️ Tech Stack

### Frontend
- **React 19** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Radix UI** - Headless UI components
- **React Hook Form** - Form state management
- **Redux Toolkit** - State management
- **React Router** - Client-side routing
- **Axios** - HTTP client
- **Recharts** - Data visualization
- **Zod** - Schema validation

### Backend
- **Node.js + Express** - Server framework
- **TypeScript** - Type safety
- **MongoDB + Mongoose** - Database
- **JWT** - Authentication
- **Socket.io** - Real-time communication
- **AWS S3** - File storage
- **Redis** - Caching (optional)
- **Nodemailer** - Email service
- **Inversify** - Dependency injection
- **Winston** - Logging
- **Zod** - Schema validation

### Development Tools
- **ESLint** - Code linting
- **Prettier** - Code formatting
- **Nodemon** - Auto-reload for development
- **Jest** - Testing framework

## 📁 Project Structure

```
ZeekNet/
├── client/                          # React frontend application
│   ├── src/
│   │   ├── api/                    # API client modules
│   │   ├── components/             # Reusable React components
│   │   │   ├── common/            # Shared components
│   │   │   ├── company/           # Company-specific components
│   │   │   ├── jobs/              # Job-related components
│   │   │   ├── headers/           # Header components
│   │   │   ├── layouts/           # Layout components
│   │   │   ├── notifications/     # Notification components
│   │   │   └── ui/                # UI primitives
│   │   ├── pages/                 # Page components
│   │   │   ├── admin/             # Admin pages
│   │   │   ├── auth/              # Authentication pages
│   │   │   ├── company/           # Company pages
│   │   │   └── seeker/            # Job seeker pages
│   │   ├── contexts/              # React contexts
│   │   ├── hooks/                 # Custom React hooks
│   │   ├── store/                 # Redux store configuration
│   │   ├── services/              # External services (Socket.io, etc)
│   │   ├── constants/             # Application constants
│   │   ├── types/                 # TypeScript type definitions
│   │   ├── interfaces/            # TypeScript interfaces
│   │   └── lib/                   # Utility functions
│   ├── vite.config.ts             # Vite configuration
│   ├── tsconfig.json              # TypeScript configuration
│   └── package.json               # Frontend dependencies
│
├── server/                          # Node.js backend application
│   ├── src/
│   │   ├── application/           # Application layer
│   │   │   ├── dto/              # Data transfer objects
│   │   │   ├── mappers/          # Entity-to-DTO mappers
│   │   │   └── use-cases/        # Business logic
│   │   ├── domain/               # Domain layer
│   │   │   ├── entities/         # Business entities
│   │   │   ├── enums/            # Enumerations
│   │   │   ├── errors/           # Custom errors
│   │   │   └── interfaces/       # Domain interfaces
│   │   ├── infrastructure/       # Infrastructure layer
│   │   │   ├── config/          # Configuration files
│   │   │   ├── database/        # MongoDB setup
│   │   │   ├── di/              # Dependency injection
│   │   │   ├── external-services/ # Third-party integrations
│   │   │   ├── messaging/       # Message queue setup
│   │   │   ├── security/        # Auth, encryption, etc
│   │   │   ├── services/        # Infrastructure services
│   │   │   └── socket/          # Socket.io setup
│   │   ├── presentation/        # Presentation layer
│   │   │   ├── controllers/     # API controllers
│   │   │   ├── middleware/      # Express middleware
│   │   │   ├── routes/          # API routes
│   │   │   └── server/          # Express server setup
│   │   └── shared/              # Shared utilities
│   │       ├── services/
│   │       ├── types/
│   │       ├── utils/
│   │       └── validation/
│   ├── tsconfig.json            # TypeScript configuration
│   ├── nodemon.json             # Nodemon configuration
│   └── package.json             # Backend dependencies
│
└── README.md                        # This file
```

## 📦 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v16.0.0 or higher)
- **npm** or **yarn** (v7.0.0 or higher)
- **MongoDB** (v4.4 or higher)
- **Git**

### Optional
- **Redis** (for caching)
- **AWS Account** (for S3 file storage)

## 🚀 Installation

### 1. Clone the Repository

```bash
git clone https://github.com/SPEC-X67/ZeekNet.git
cd ZeekNet
```

### 2. Install Frontend Dependencies

```bash
cd client
npm install
cd ..
```

### 3. Install Backend Dependencies

```bash
cd server
npm install
cd ..
```

## ⚙️ Configuration

### Backend Configuration

Create a `.env` file in the `server` directory with the following variables:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Database
MONGODB_URI=mongodb://localhost:27017/zeeknet
MONGODB_TEST_URI=mongodb://localhost:27017/zeeknet-test

# JWT
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRY=7d

# Email Service
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email@gmail.com
EMAIL_PASSWORD=your_email_password
EMAIL_FROM=noreply@zeeknet.com

# AWS S3
AWS_REGION=your_aws_region
AWS_ACCESS_KEY_ID=your_access_key
AWS_SECRET_ACCESS_KEY=your_secret_key
AWS_S3_BUCKET=your_bucket_name

# Google OAuth
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

# Redis (Optional)
REDIS_URL=redis://localhost:6379

# Frontend URL
FRONTEND_URL=http://localhost:5173

# Socket.io
SOCKET_IO_ORIGIN=http://localhost:5173
```

### Frontend Configuration

Create a `.env.local` file in the `client` directory:

```env
VITE_API_URL=http://localhost:5000/api
VITE_GOOGLE_CLIENT_ID=your_google_client_id
```

## 🏃 Running the Application

### Development Mode

#### Terminal 1 - Start Backend Server

```bash
cd server
npm run dev
```

The backend will start on `http://localhost:5000`

#### Terminal 2 - Start Frontend Development Server

```bash
cd client
npm run dev
```

The frontend will start on `http://localhost:5173`

### Production Mode

#### Build Frontend

```bash
cd client
npm run build
```

#### Build Backend

```bash
cd server
npm run build
```

#### Start Backend (Production)

```bash
cd server
npm start
```

## 💻 Development

### Available Scripts

#### Frontend

```bash
cd client

# Start development server with HMR
npm run dev

# Build for production
npm run build

# Lint code
npm run lint

# Preview production build
npm run preview
```

#### Backend

```bash
cd server

# Start development server with auto-reload
npm run dev

# Build TypeScript
npm run build

# Start production server
npm start

# Lint code
npm run lint

# Format code
npm run format

# Run S3 tests
npm run test:s3
```

### Code Style

The project uses:
- **ESLint** for code quality
- **Prettier** for code formatting
- **TypeScript** for type safety

Make sure to follow these standards when contributing code.

## 📚 API Documentation

The API follows RESTful principles and includes the following main endpoints:

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user
- `POST /api/auth/refresh-token` - Refresh JWT token

### Jobs
- `GET /api/jobs` - Get all job listings
- `GET /api/jobs/:id` - Get job details
- `POST /api/jobs` - Create job posting (Company)
- `PUT /api/jobs/:id` - Update job posting (Company)
- `DELETE /api/jobs/:id` - Delete job posting (Company)

### Applications
- `GET /api/job-applications` - Get user applications
- `POST /api/job-applications` - Apply for a job
- `PUT /api/job-applications/:id/status` - Update application status

### User Profiles
- `GET /api/seeker/profile` - Get seeker profile
- `PUT /api/seeker/profile` - Update seeker profile
- `GET /api/company/profile` - Get company profile
- `PUT /api/company/profile` - Update company profile

### Notifications
- `GET /api/notifications` - Get user notifications
- `PUT /api/notifications/:id/read` - Mark notification as read

### Admin
- `GET /api/admin/users` - Get all users
- `POST /api/admin/verify-company` - Verify company
- `GET /api/admin/statistics` - Get platform statistics

For detailed API documentation, refer to the controller files in `server/src/presentation/controllers/`

## 🏗️ Project Architecture

ZeekNet follows **Clean Architecture** principles with clear separation of concerns:

### Layers

1. **Presentation Layer** (`presentation/`)
   - Handles HTTP requests and responses
   - Route definitions
   - Middleware (authentication, validation, error handling)

2. **Application Layer** (`application/`)
   - Use cases and business logic orchestration
   - DTOs for data transfer
   - Mappers for entity transformation

3. **Domain Layer** (`domain/`)
   - Business rules and entities
   - Domain-specific errors
   - Interfaces for contracts

4. **Infrastructure Layer** (`infrastructure/`)
   - External service integrations
   - Database access
   - Configuration management
   - Security implementations

5. **Shared Layer** (`shared/`)
   - Common utilities
   - Shared types and validation

### Key Design Patterns

- **Dependency Injection** - Using Inversify for loose coupling
- **Repository Pattern** - Data access abstraction
- **Use Case Pattern** - Encapsulation of business logic
- **DTO Pattern** - Data transformation between layers
- **Observer Pattern** - Real-time updates via WebSockets

## 🤝 Contributing

We welcome contributions to ZeekNet! Please follow these steps:

1. Create a feature branch (`git checkout -b feature/your-feature`)
2. Commit your changes (`git commit -am 'Add your feature'`)
3. Push to the branch (`git push origin feature/your-feature`)
4. Submit a Pull Request

Please ensure your code:
- Follows the project's code style
- Passes linting checks (`npm run lint`)
- Is properly typed with TypeScript
- Includes appropriate comments and documentation

## 📄 License

This project is licensed under the ISC License - see the LICENSE file for details.

## 👥 Support

For questions, issues, or suggestions, please open an issue on the GitHub repository.

---

**Happy coding! 🚀**

Built with ❤️ by the ZeekNet Team
