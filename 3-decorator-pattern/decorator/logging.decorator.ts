import { NotificationProvider } from '../types/interfaces/notification-provider.interface';
import { RateLimitError } from '../types/errors/rate-limit.error';
import { SimulationError } from '../types/errors/simulation.error';

export class LoggingDecorator implements NotificationProvider {
  constructor(private notificationProvider: NotificationProvider) {}

  async sendNotification(message: string): Promise<void> {
    const timestamp = new Date().toISOString();
    console.log(`\n📝 [${timestamp}] Sending notification...`);

    try {
      await this.notificationProvider.sendNotification(message);
      console.log(`✅ [${timestamp}] Notification sent successfully`);
    } catch (error) {
      if (error instanceof RateLimitError || error instanceof SimulationError) {
        throw error; // Let these errors be handled by their respective decorators
      }
      console.log(
        `❌ [${timestamp}] Notification failed: ${error instanceof Error ? error.message : 'Unknown error'}`,
      );
      throw error;
    }
  }
}
