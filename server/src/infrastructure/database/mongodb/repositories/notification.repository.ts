import { NotificationModel, NotificationDocument } from '../models/notification.model';
import { INotificationRepository, CreateNotificationData } from '../../../../domain/interfaces/repositories/notification/INotificationRepository';
import { Notification } from '../../../../domain/entities/notification.entity';

export class NotificationRepository implements INotificationRepository {
  async create(data: CreateNotificationData): Promise<Notification> {
    const notification = new NotificationModel({
      user_id: data.user_id,
      type: data.type,
      title: data.title,
      message: data.message,
      data: data.data || {},
      is_read: false,
    });

    await notification.save();
    return this.toEntity(notification);
  }

  async findByUserId(userId: string, limit: number = 50, skip: number = 0): Promise<Notification[]> {
    const notifications = await NotificationModel.find({ user_id: userId })
      .sort({ created_at: -1 })
      .limit(limit)
      .skip(skip)
      .lean();

    return notifications.map(this.toEntity);
  }

  async markAsRead(notificationId: string, userId: string): Promise<Notification | null> {
    const notification = await NotificationModel.findOneAndUpdate(
      { _id: notificationId, user_id: userId, is_read: false },
      { is_read: true, read_at: new Date() },
      { new: true }
    ).lean();

    return notification ? this.toEntity(notification) : null;
  }

  async markAllAsRead(userId: string): Promise<void> {
    await NotificationModel.updateMany(
      { user_id: userId, is_read: false },
      { is_read: true, read_at: new Date() }
    );
  }

  async getUnreadCount(userId: string): Promise<number> {
    return NotificationModel.countDocuments({ user_id: userId, is_read: false });
  }

  private toEntity(doc: NotificationDocument | any): Notification {
    return {
      id: doc._id.toString(),
      user_id: doc.user_id.toString(),
      type: doc.type,
      title: doc.title,
      message: doc.message,
      data: doc.data,
      is_read: doc.is_read,
      read_at: doc.read_at,
      created_at: doc.created_at,
    };
  }
}

