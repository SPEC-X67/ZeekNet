import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import path from 'path';
import { createStream } from 'rotating-file-stream';

import { connectToDatabase } from '../../infrastructure/database/mongodb/connection/mongoose';
import { connectRedis } from '../../infrastructure/database/redis/connection/redis';
import { env } from '../../infrastructure/config/env';

import { AuthRouter } from '../routes/auth-router';
import { CompanyRouter } from '../routes/company-router';
import { AdminRouter } from '../routes/admin-router';
import { SeekerRouter } from '../routes/seeker-router';
import { PublicRouter } from '../routes/public-router';
import { authenticateToken } from '../middleware/auth.middleware';
import { errorHandler } from '../middleware/error-handler';
import { UserBlockedMiddleware } from '../middleware/user-blocked.middleware';
import { userRepository } from '../../infrastructure/di/authDi';
import { companyRepository } from '../../infrastructure/di/companyDi';
import { DateTimeUtil } from '../../shared/utils';

export class AppServer {
  private _app: express.Application;
  private _port: number;

  constructor() {
    this._app = express();
    this._port = Number(env.PORT ?? 4000);
  }

  public init(): void {
    this.configureMiddlewares();
    this.configureRoutes();
  }

  private configureMiddlewares(): void {
    this._app.use(helmet());
    
    this._app.use(cors({ 
      origin: env.FRONTEND_URL || 'http://localhost:5173', 
      credentials: true, 
    }));
    
    this._app.use(express.json({ limit: '10mb' }));
    this._app.use(express.urlencoded({ extended: true }));
    this._app.use(cookieParser());
    
    this._setLoggingMiddleware();
  }

  private _setLoggingMiddleware(): void {
    if (env.NODE_ENV === 'development') {
      this._app.use(morgan('dev'));
    } else if (env.NODE_ENV === 'production') {
      const accessLogs = createStream(
        (time, index) => {
          if (!time) return path.join(__dirname, 'logs', 'accessLogs', 'buffer.txt');
          return path.join(
            __dirname,
            'logs',
            'accessLogs',
            DateTimeUtil.getFormatedDateTime(new Date(time)) + '-' + index + '.txt',
          );
        },
        {
          interval: '1d',
          size: '100M',
        },
      );

      const errorLogs = createStream(
        (time, index) => {
          if (!time) return path.join(__dirname, 'logs', 'errorLogs', 'buffer.txt');
          return path.join(
            __dirname,
            'logs',
            'errorLogs',
            DateTimeUtil.getFormatedDateTime(new Date(time)) + '-' + index + '.txt',
          );
        },
        {
          interval: '1d',
          size: '100M',
        },
      );

      this._app.use(morgan('combined', { stream: accessLogs }));

      this._app.use(
        morgan('combined', {
          stream: errorLogs,
          skip: (req, res) => res.statusCode < 400,
        }),
      );
    }
  }

  private configureRoutes(): void {
    const userBlockedMiddleware = new UserBlockedMiddleware(userRepository, companyRepository);

    this._app.get('/health', (req, res) => res.json({ 
      status: 'OK', 
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
    }));

    this._app.get('/home', authenticateToken, userBlockedMiddleware.checkUserBlocked, (req, res) =>
      res.json({ message: 'Welcome to ZeekNet Job Portal API' }),
    );

    this._app.use('/api/auth', new AuthRouter().router);
    this._app.use('/api/admin', new AdminRouter().router);
    this._app.use('/api/company', new CompanyRouter().router);
    this._app.use('/api/seeker', new SeekerRouter().router);
    this._app.use('/api/public', new PublicRouter().router);

    this._app.use(errorHandler);
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

  public async start(): Promise<void> {
    try {
      await this.connectDatabase();
      this.init();
      
      this._app.listen(this._port, () => {
        console.log(`Server running on http://localhost:${this._port}`);
        console.log(`Health check: http://localhost:${this._port}/health`);
      });

    } catch (error) {
      console.error('Server startup failed:', error);
      throw error;
    }
  }
}
 