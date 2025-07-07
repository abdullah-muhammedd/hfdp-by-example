import { NotificationChannel } from './notification-channel.type';
export type NotificationOptions = {
  to: string;
  subject?: string;
  message: string;
  channel: NotificationChannel;
};
