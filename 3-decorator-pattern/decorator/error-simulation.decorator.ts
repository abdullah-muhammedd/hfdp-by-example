import { NotificationProvider } from '../types/interfaces/notification-provider.interface';
import { SimulationError } from '../types/errors/simulation.error';

export class ErrorSimulationDecorator implements NotificationProvider {
  private failureRate: number;

  constructor(
    private notificationProvider: NotificationProvider,
    failurePercentage: number = 75,
  ) {
    this.failureRate = Math.min(Math.max(failurePercentage, 0), 100);
  }

  async sendNotification(message: string): Promise<void> {
    const shouldFail = Math.random() * 100 < this.failureRate;

    if (shouldFail) {
      console.log(`\n💥 Simulating failure (${this.failureRate}% chance)`);
      throw new SimulationError(this.failureRate);
    }

    await this.notificationProvider.sendNotification(message);
  }
}
