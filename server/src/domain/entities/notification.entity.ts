import { NotificationType } from '../../infrastructure/database/mongodb/models/notification.model';

export interface Notification {
  id: string;
  user_id: string;
  type: NotificationType;
  title: string;
  message: string;
  data?: Record<string, unknown>;
  is_read: boolean;
  read_at?: Date;
  created_at: Date;
}

