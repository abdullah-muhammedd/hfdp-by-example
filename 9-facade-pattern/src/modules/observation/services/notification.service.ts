import { NotificationChannel } from '../../../types/notification-channel.type';
import { NotificationOptions } from '../../../types/notification-options.type';

export class NotificationService {
  async send(options: NotificationOptions): Promise<void> {
    switch (options.channel as NotificationChannel) {
      case 'email':
        this.sendEmail(options);
        break;
      case 'sms':
        this.sendSms(options);
        break;
      default:
        throw new Error(`Unsupported channel: ${options.channel}`);
    }
  }

  private sendEmail(options: NotificationOptions) {
    // Dummy implementation
    console.log(
      `[EMAIL] To: ${options.to}, Subject: ${options.subject}, Message: ${options.message}`,
    );
  }

  private sendSms(options: NotificationOptions) {
    // Dummy implementation
    console.log(`[SMS] To: ${options.to}, Message: ${options.message}`);
  }
}
