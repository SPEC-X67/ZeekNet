import { Notification } from '../../domain/entities/notification.entity';
import { NotificationDocument } from '../../infrastructure/database/mongodb/models/notification.model';

export class NotificationMapper {
  static toDomain(doc: NotificationDocument | Record<string, unknown>): Notification {
    const asDoc = doc as unknown as {
      _id?: unknown;
      user_id?: unknown;
      type?: unknown;
      title?: unknown;
      message?: unknown;
      data?: unknown;
      is_read?: unknown;
      read_at?: unknown;
      created_at?: unknown;
    };

    return {
      id: String(asDoc._id ?? ''),
      user_id: String(asDoc.user_id ?? ''),
      type: asDoc.type as Notification['type'],
      title: String(asDoc.title ?? ''),
      message: String(asDoc.message ?? ''),
      data: (asDoc.data as Record<string, unknown>) || {},
      is_read: Boolean(asDoc.is_read),
      read_at: asDoc.read_at as Date | undefined,
      created_at: (asDoc.created_at as Date) || new Date(),
    };
  }
}
