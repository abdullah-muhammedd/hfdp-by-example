import { NotificationProvider } from '../types/interfaces/notification-provider.interface';

export class SMSNotificationProvider implements NotificationProvider {
  sendNotification(message: string): void {
    console.log(`📱 Sending SMS notification: ${message}`);
  }
}
