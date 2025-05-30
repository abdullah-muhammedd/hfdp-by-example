import { NotificationProvider } from '../types/interfaces/notification-provider.interface';

export class RetryOnFailDecorator implements NotificationProvider {
  private readonly maxRetries: number = 3;
  private readonly retryDelayMs: number = 1000;

  constructor(private notificationProvider: NotificationProvider) {}

  async sendNotification(message: string): Promise<void> {
    let attempts = 0;

    while (attempts < this.maxRetries) {
      try {
        if (attempts > 0) {
          console.log(`\n🔄 Retry attempt ${attempts + 1}/${this.maxRetries}`);
        }
        await this.notificationProvider.sendNotification(message);
        if (attempts > 0) {
          console.log('✅ Retry successful');
        }
        return;
      } catch (error) {
        attempts++;
        if (attempts < this.maxRetries) {
          console.log(`\n❌ Attempt ${attempts} failed`);
          console.log(`⏳ Waiting ${this.retryDelayMs}ms before next retry...`);
          await new Promise((resolve) => setTimeout(resolve, this.retryDelayMs));
        } else {
          console.log(`\n❌ All ${this.maxRetries} retry attempts failed`);
          throw error;
        }
      }
    }
  }
}
