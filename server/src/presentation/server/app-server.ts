import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import http from 'http';
import mongoose from 'mongoose';
import { injectable } from 'inversify';

import { connectToDatabase } from '../../infrastructure/database/mongodb/connection/mongoose';
import { connectRedis } from '../../infrastructure/database/redis/connection/redis';
import { env } from '../../infrastructure/config/env';

import { createAuthRouter } from '../routes/auth.routes';
import { createAdminRouter } from '../routes/admin.routes';
import { createCompanyRouter } from '../routes/company.routes';
import { createSeekerRoutes } from '../routes/seeker.routes';
import { createPublicRouter } from '../routes/public.routes';
import { authenticateToken } from '../middleware/auth.middleware';
import { errorHandler } from '../middleware/error-handler';

import { RegistrationController } from '../controllers/auth/registration.controller';
import { LoginController } from '../controllers/auth/login.controller';
import { TokenController } from '../controllers/auth/token.controller';
import { PasswordController } from '../controllers/auth/password.controller';
import { OtpController } from '../controllers/auth/otp.controller';
import { AdminController } from '../controllers/admin/admin.controller';
import { CompanyController } from '../controllers/company/company.controller';
import { CompanyJobPostingController } from '../controllers/company/company-job-posting.controller';
import { SeekerController } from '../controllers/seeker/seeker.controller';
import { PublicJobController } from '../controllers/public/public-job.controller';
import { UserBlockedMiddleware } from '../middleware/user-blocked.middleware';

import { container } from '../../infrastructure/di/container';
import { TYPES } from '../../infrastructure/di/types';

@injectable()
export class AppServer {
  private app: express.Application;
  private port: number;
  private httpServer: http.Server | null;

  constructor() {
    this.app = express();
    this.port = Number(env.PORT ?? 4000);
    this.httpServer = null;
  }

  public init(): void {
    this.configureMiddlewares();
    this.configureRoutes();
  }

  private configureMiddlewares(): void {
    this.app.use(helmet());
    
    this.app.use(cors({ 
      origin: env.FRONTEND_URL || 'http://localhost:5173', 
      credentials: true, 
    }));
    
    this.app.use(express.json({ limit: '10mb' }));
    this.app.use(cookieParser());
    
    this.app.use(morgan('combined'));
  }

  private configureRoutes(): void {
    const registrationController = container.get<RegistrationController>(TYPES.RegistrationController);
    const loginController = container.get<LoginController>(TYPES.LoginController);
    const tokenController = container.get<TokenController>(TYPES.TokenController);
    const passwordController = container.get<PasswordController>(TYPES.PasswordController);
    const adminController = container.get<AdminController>(TYPES.AdminController);
    const companyController = container.get<CompanyController>(TYPES.CompanyController);
    const companyJobPostingController = container.get<CompanyJobPostingController>(TYPES.CompanyJobPostingController);
    const seekerController = container.get<SeekerController>(TYPES.SeekerController);
    const publicJobController = container.get<PublicJobController>(TYPES.PublicJobController);
    const otpController = container.get<OtpController>(TYPES.OtpController);
    const userBlockedMiddleware = container.get<UserBlockedMiddleware>(TYPES.UserBlockedMiddleware);

    this.app.get('/health', (req, res) => res.json({ 
      status: 'OK', 
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
    }));

    this.app.get('/home', authenticateToken, userBlockedMiddleware.checkUserBlocked, (req, res) =>
      res.json({ message: 'Welcome to ZeekNet Job Portal API' }),
    );

    this.app.use('/api/auth', createAuthRouter(registrationController, loginController, tokenController, passwordController, otpController));
    this.app.use('/api/admin', createAdminRouter(adminController, userBlockedMiddleware));
    this.app.use('/api/company', createCompanyRouter(companyController, companyJobPostingController, userBlockedMiddleware));
    this.app.use('/api/seeker', createSeekerRoutes(seekerController));
    this.app.use('/api/public', createPublicRouter(publicJobController));

    this.app.use(errorHandler);
  }

  public async connectDatabase(): Promise<void> {
    try {
      await connectToDatabase(env.MONGO_URI as string);
      console.log('Connected to MongoDB');
    } catch (error) {
      console.error('MongoDB connection failed:', error);
      throw error;
    }

    try {
      await connectRedis();
      console.log('Connected to Redis');
    } catch (error) {
      console.error('Redis connection failed:', error);
      throw error;
    }
  }

  public start(): void {
    if (this.httpServer) {
      console.log('⚠️Server is already running');
      return;
    }
    
    this.httpServer = this.app.listen(this.port, () => {
      console.log(`Server running on port ${this.port}`);
      console.log(`Health check: http://localhost:${this.port}/health`);
    });
  }

  public async stop(): Promise<void> {
    console.log('Stopping server...');
    
    if (this.httpServer) {
      await new Promise<void>((resolve, reject) => {
        this.httpServer!.close((err) => {
          if (err) reject(err);
          else resolve();
        });
      });
      this.httpServer = null;
      console.log('HTTP server closed');
    }

    if (mongoose.connection.readyState !== 0) {
      await mongoose.connection.close();
      console.log('MongoDB connection closed');
    }
  }
}
 