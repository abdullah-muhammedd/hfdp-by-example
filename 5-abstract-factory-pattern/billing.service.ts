// services/billing.service.ts
import { JobsFactoryInterface } from './types/interface/job-factory.interface';
import { JobRunnerInterface } from './types/interface/job-runner.interface';
import { JobProcessorInterface } from './types/interface/job-processor.interface';
import { JobSerializerInterface } from './types/interface/job-serilaizer.interface';

export class BillingService {
  private runner: JobRunnerInterface | null = null;
  private processor: JobProcessorInterface | null = null;
  private serializer: JobSerializerInterface | null = null;

  async init(factory: JobsFactoryInterface): Promise<void> {
    this.runner = await factory.createRunner();
    this.processor = await factory.createProcessor();
    this.serializer = await factory.createSerializer();
  }

  async switchFactory(factory: JobsFactoryInterface): Promise<void> {
    await this.init(factory);
  }

  async billUser(userId: number): Promise<void> {
    const payload = this.serializer?.serialize({ userId });
    await this.runner?.publish('billUser', payload);
  }

  async startProcessing(): Promise<void> {
    if (!this.serializer) throw new Error('Service is not initialized');
    await this.processor?.process(this.serializer);
  }
}
