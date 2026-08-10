import { z } from 'zod';
import { NotificationType } from 'src/domain/enums/notification-type.enum';

export const GetNotificationsSchema = z.object({
  userId: z.string().min(1, 'User ID is required'),
  limit: z.coerce.number().int().positive().max(100).default(10),
  skip: z.coerce.number().int().nonnegative().default(0),
});
