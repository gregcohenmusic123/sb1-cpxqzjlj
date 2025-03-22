export type NotificationType = 'purchase' | 'comment' | 'like' | 'follow' | 'mention';

export interface Notification {
  id: string;
  type: NotificationType;
  message: string;
  read: boolean;
  timestamp: number;
  link?: string;
}