import { NotificationProvider } from '../types/interfaces/notification-provider.interface';

export class EmailNotificationProvider implements NotificationProvider {
  sendNotification(message: string): void {
    console.log(`📧 Sending email notification: ${message}`);
  }
}
