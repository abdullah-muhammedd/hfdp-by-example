import { NotificationProvider } from '../types/interfaces/notification-provider.interface';
import { RateLimitError } from '../types/errors/rate-limit.error';

export class NotificationService {
  constructor(private provider: NotificationProvider) {}

  setProvider(provider: NotificationProvider): void {
    console.log('\n🔄 Switching notification provider');
    this.provider = provider;
  }

  async sendNotification(message: string): Promise<void> {
    try {
      await this.provider.sendNotification(message);
    } catch (error) {
      if (error instanceof RateLimitError) {
        // Rate limit errors are already logged by the decorator
        return;
      }

      if (error instanceof Error) {
        console.error('\n❌ Notification failed:', error.message);
      } else {
        console.error('\n❌ Notification failed with unknown error');
      }
      throw error;
    }
  }
}
