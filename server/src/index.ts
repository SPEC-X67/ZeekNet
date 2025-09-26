require('dotenv').config();
import 'reflect-metadata';
import { container } from './infrastructure/di/container';
import { TYPES } from './infrastructure/di/types';
import { AppServer } from './presentation/server/app-server';

async function bootstrap() {
  try {
    console.log('🚀 Starting ZeekNet Job Portal Server...');
    
    const server = container.get<AppServer>(TYPES.AppServer);
    
    server.init();
    
    await server.connectDatabase();
    
    server.start();
    
    console.log('Server started successfully!');

    const shutdown = async (signal: string) => {
      console.log(`\nReceived ${signal}. Shutting down gracefully...`);
      try {
        await server.stop();
        console.log('Server stopped successfully');
        process.exit(0);
      } catch (err) {
        console.error('Error during shutdown:', err);
        process.exit(1);
      }
    };

    process.on('SIGINT', () => shutdown('SIGINT'));
    process.on('SIGTERM', () => shutdown('SIGTERM'));
    
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

bootstrap().catch((err) => {
  console.error('Bootstrap error:', err);
  process.exit(1);
});