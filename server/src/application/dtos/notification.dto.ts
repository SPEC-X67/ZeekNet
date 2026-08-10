import { GetNotificationsSchema } from 'src/application/validations/notification.validation';
import { z } from 'zod';
import { NotificationType } from 'src/domain/enums/notification-type.enum';

export type GetNotificationsRequestDto = z.infer<typeof GetNotificationsSchema>;
export interface NotificationResponseDto {
  id: string;
  userId: string;
  type: NotificationType;
  title: string;
  message: string;
  isRead: boolean;
  createdAt: Date;
  data?: Record<string, unknown>;
  readAt?: Date;
}
