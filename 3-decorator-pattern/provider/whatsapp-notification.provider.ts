import { NotificationProvider } from '../types/interfaces/notification-provider.interface';

export class WhatsAppNotificationProvider implements NotificationProvider {
  sendNotification(message: string): void {
    console.log(`💬 Sending WhatsApp notification: ${message}`);
  }
}
