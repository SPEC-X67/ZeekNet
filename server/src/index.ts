import 'dotenv/config';
import 'reflect-metadata';
import { AppServer } from './presentation/server/app-server';
import { logger } from './infrastructure/config/logger';

async function start() {
  try {
    const server = new AppServer();
    logger.info('Server initialization started');
    await server.start();
  } catch (error) {
    logger.error('❌ Failed to start server:', error);
    process.exit(1);
  }
}

start();