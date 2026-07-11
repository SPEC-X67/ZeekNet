import { z } from 'zod';
import { NotificationType } from 'src/domain/enums/notification-type.enum';

// requests/get-notifications.dto.ts
export const GetNotificationsDto = z.object({
  userId: z.string().min(1, 'User ID is required'),
  limit: z.coerce.number().int().positive().max(100).default(10),
  skip: z.coerce.number().int().nonnegative().default(0),
});
export type GetNotificationsRequestDto = z.infer<typeof GetNotificationsDto>;

// responses/notification-response.dto.ts
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
