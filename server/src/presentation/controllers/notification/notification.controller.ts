import { Response, NextFunction } from 'express';
import { AuthenticatedRequest } from '../../../shared/types/authenticated-request';
import { INotificationRepository } from '../../../domain/interfaces/repositories/notification/INotificationRepository';
import { sendSuccessResponse, handleAsyncError } from '../../../shared/utils/controller.utils';

export class NotificationController {
  constructor(
    private readonly _notificationRepository: INotificationRepository,
  ) {}

  getNotifications = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userId = req.user?.id;
      if (!userId) {
        return;
      }

      const limit = parseInt(req.query.limit as string) || 50;
      const skip = parseInt(req.query.skip as string) || 0;

      const notifications = await this._notificationRepository.findByUserId(userId, limit, skip);
      sendSuccessResponse(res, 'Notifications retrieved successfully', notifications);
    } catch (error) {
      handleAsyncError(error, next);
    }
  };

  markAsRead = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userId = req.user?.id;
      const notificationId = req.params.id;

      if (!userId) {
        return;
      }

      const notification = await this._notificationRepository.markAsRead(notificationId, userId);
      if (!notification) {
        sendSuccessResponse(res, 'Notification not found or already read', null, undefined, 404);
        return;
      }

      sendSuccessResponse(res, 'Notification marked as read', notification);
    } catch (error) {
      handleAsyncError(error, next);
    }
  };

  markAllAsRead = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userId = req.user?.id;
      if (!userId) {
        return;
      }

      await this._notificationRepository.markAllAsRead(userId);
      sendSuccessResponse(res, 'All notifications marked as read', null);
    } catch (error) {
      handleAsyncError(error, next);
    }
  };

  getUnreadCount = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userId = req.user?.id;
      if (!userId) {
        return;
      }

      const count = await this._notificationRepository.getUnreadCount(userId);
      sendSuccessResponse(res, 'Unread count retrieved successfully', { count });
    } catch (error) {
      handleAsyncError(error, next);
    }
  };
}

