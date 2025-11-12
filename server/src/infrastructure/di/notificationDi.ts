import { NotificationRepository } from '../database/mongodb/repositories/notification.repository';
import { NotificationController } from '../../presentation/controllers/notification/notification.controller';
import { NotificationRouter } from '../../presentation/routes/notification-router';

const notificationRepository = new NotificationRepository();

export const notificationController = new NotificationController(notificationRepository);

export const notificationRouter = new NotificationRouter(notificationController);

export { notificationRepository };

