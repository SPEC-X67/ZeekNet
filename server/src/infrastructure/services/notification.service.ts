import { Server as SocketIOServer } from 'socket.io';
import { INotificationRepository, CreateNotificationData } from '../../domain/interfaces/repositories/notification/INotificationRepository';

export class NotificationService {
  private io: SocketIOServer | null = null;
  private userSockets: Map<string, string> = new Map();

  setIO(io: SocketIOServer): void {
    this.io = io;
  }

  registerUser(userId: string, socketId: string): void {
    this.userSockets.set(userId, socketId);
  }

  unregisterUser(userId: string): void {
    this.userSockets.delete(userId);
  }

  async sendNotification(
    repository: INotificationRepository,
    data: CreateNotificationData
  ): Promise<void> {
    const notification = await repository.create(data);

    const socketId = this.userSockets.get(data.user_id);
    if (socketId && this.io) {
      this.io.to(socketId).emit('notification', notification);
    }
  }
}

export const notificationService = new NotificationService();

