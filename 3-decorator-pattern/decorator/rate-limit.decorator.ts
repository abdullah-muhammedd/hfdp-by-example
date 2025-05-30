import { NotificationProvider } from '../types/interfaces/notification-provider.interface';
import { RateLimitError } from '../types/errors/rate-limit.error';

export class RateLimitDecorator implements NotificationProvider {
  private lastNotificationTime: number = 0;
  private readonly minIntervalMs: number = 5000; // 5 seconds

  constructor(private notificationProvider: NotificationProvider) {}

  async sendNotification(message: string): Promise<void> {
    const currentTime = Date.now();
    const timeSinceLastNotification = currentTime - this.lastNotificationTime;

    if (timeSinceLastNotification < this.minIntervalMs) {
      const waitTimeSeconds = Math.ceil((this.minIntervalMs - timeSinceLastNotification) / 1000);
      console.log(`\n⏰ Rate limit: Must wait ${waitTimeSeconds} seconds before next notification`);
      throw new RateLimitError(waitTimeSeconds);
    }

    this.lastNotificationTime = currentTime;
    await this.notificationProvider.sendNotification(message);
  }
}
