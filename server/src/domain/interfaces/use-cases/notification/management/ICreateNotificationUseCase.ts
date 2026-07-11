import { CreateNotificationData } from 'src/domain/interfaces/repositories/notification/INotificationRepository';
import { NotificationResponseDto } from 'src/application/dtos/notification/notification.dto';;

export interface ICreateNotificationUseCase {
  execute(data: CreateNotificationData): Promise<NotificationResponseDto>;
}
