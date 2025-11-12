import { NotificationModel, NotificationDocument } from '../models/notification.model';
import { NotificationMapper } from '../../../../application/mappers/notification.mapper';
import { INotificationRepository, CreateNotificationData } from '../../../../domain/interfaces/repositories/notification/INotificationRepository';
import { Notification } from '../../../../domain/entities/notification.entity';
import { RepositoryBase } from './base-repository';
import { Types } from 'mongoose';

export class NotificationRepository extends RepositoryBase<Notification, NotificationDocument> implements INotificationRepository {
  constructor() {
    super(NotificationModel);
  }

  protected mapToEntity(document: NotificationDocument): Notification {
    return NotificationMapper.toDomain(document);
  }

  // Override to match interface signature
  async create(data: CreateNotificationData): Promise<Notification> {
    const notification = new NotificationModel({
      user_id: new Types.ObjectId(data.user_id),
      type: data.type,
      title: data.title,
      message: data.message,
      data: data.data || {},
      is_read: false,
    });

    await notification.save();
    return this.mapToEntity(notification);
  }

  async findByUserId(userId: string, limit: number = 50, skip: number = 0): Promise<Notification[]> {
    const notifications = await this.model.find({ user_id: new Types.ObjectId(userId) })
      .sort({ created_at: -1 })
      .limit(limit)
      .skip(skip)
      .lean();

    return notifications.map((doc) => NotificationMapper.toDomain(doc));
  }

  async markAsRead(notificationId: string, userId: string): Promise<Notification | null> {
    const notification = await this.model.findOneAndUpdate(
      { _id: notificationId, user_id: new Types.ObjectId(userId), is_read: false },
      { is_read: true, read_at: new Date() },
      { new: true },
    ).lean();

    return notification ? NotificationMapper.toDomain(notification) : null;
  }

  async markAllAsRead(userId: string): Promise<void> {
    await this.model.updateMany(
      { user_id: new Types.ObjectId(userId), is_read: false },
      { is_read: true, read_at: new Date() },
    );
  }

  async getUnreadCount(userId: string): Promise<number> {
    return this.countDocuments({ user_id: new Types.ObjectId(userId), is_read: false });
  }
}

