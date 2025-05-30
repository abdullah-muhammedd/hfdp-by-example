import { NotificationProvider } from '../types/interfaces/notification-provider.interface';
import { LoggingDecorator } from '../decorator/logging.decorator';
import { RateLimitDecorator } from '../decorator/rate-limit.decorator';
import { RetryOnFailDecorator } from '../decorator/retry-on-fail.decorator';
import { ErrorSimulationDecorator } from '../decorator/error-simulation.decorator';

export class NotificationProviderBuilder {
  private provider: NotificationProvider;

  constructor(baseProvider: NotificationProvider) {
    this.provider = baseProvider;
  }

  addLogging(): NotificationProviderBuilder {
    this.provider = new LoggingDecorator(this.provider);
    return this;
  }

  addRateLimit(): NotificationProviderBuilder {
    this.provider = new RateLimitDecorator(this.provider);
    return this;
  }

  addRetry(): NotificationProviderBuilder {
    this.provider = new RetryOnFailDecorator(this.provider);
    return this;
  }

  addErrorSimulation(failureRate: number = 75): NotificationProviderBuilder {
    this.provider = new ErrorSimulationDecorator(this.provider, failureRate);
    return this;
  }

  addAllDecorators(errorRate: number = 50): NotificationProviderBuilder {
    return this.addLogging().addRateLimit().addErrorSimulation(errorRate).addRetry();
  }

  build(): NotificationProvider {
    return this.provider;
  }
}
