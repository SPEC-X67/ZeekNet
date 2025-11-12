import { baseApi } from './base.api';

export interface Notification {
  id: string;
  user_id: string;
  type: string;
  title: string;
  message: string;
  data?: Record<string, unknown>;
  is_read: boolean;
  read_at?: string;
  created_at: string;
}

export const notificationApi = {
  getNotifications: (params?: { limit?: number; skip?: number }) => {
    const query = params ? `?${new URLSearchParams(params as any).toString()}` : '';
    return baseApi.get<Notification[]>(`/api/notifications${query}`)();
  },

  getUnreadCount: () => baseApi.get<{ count: number }>('/api/notifications/unread-count')(),

  markAsRead: (id: string) => baseApi.patch<Notification>(`/api/notifications/${id}/read`)({}),

  markAllAsRead: () => baseApi.patch<void>('/api/notifications/read-all')({}),
};
