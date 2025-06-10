import { JobsFactoryInterface } from '../../types/interface/job-factory.interface';
import { JobProcessorInterface } from '../../types/interface/job-processor.interface';
import { JobRunnerInterface } from '../../types/interface/job-runner.interface';
import { JobSerializerInterface } from '../../types/interface/job-serilaizer.interface';
import { RabbitJobProcessor } from './rabbit-mq.processor';
import { RabbitJobRunner } from './rabbit-mq.runner';
import { RabbitJobSerializer } from './rabbit-mq.serializer';
import * as amqplib from 'amqplib';

export class RabbitJobsFactory implements JobsFactoryInterface {
  private connection: amqplib.Connection | any | null = null;
  private instanceCache = new Map<
    string,
    RabbitJobRunner | RabbitJobSerializer | RabbitJobProcessor
  >();

  constructor(
    private readonly queueName = 'default',
    private readonly connectionUrl = 'amqp://localhost',
  ) {}
  public async createProcessor(): Promise<JobProcessorInterface> {
    const cached = this.instanceCache.get(RabbitJobProcessor.name);
    if (cached) return cached as RabbitJobProcessor;

    await this.init();
    if (!this.connection) throw new Error('Failed to establish RabbitMQ connection');

    const processor = new RabbitJobProcessor(this.queueName, this.connection);
    this.instanceCache.set(RabbitJobProcessor.name, processor);
    return processor;
  }

  private async init(): Promise<void> {
    if (this.connection) return;

    this.connection = await amqplib.connect(this.connectionUrl);
    this.connection.on('error', (err: Error) => {
      console.error('[RabbitMQ] Connection error:', err.message);
      this.connection = null;
    });
  }

  public async createRunner(): Promise<JobRunnerInterface> {
    const cached = this.instanceCache.get(RabbitJobRunner.name);
    if (cached) return cached as RabbitJobRunner;

    await this.init();
    if (!this.connection) throw new Error('Failed to establish RabbitMQ connection');

    const runner = new RabbitJobRunner(this.queueName, this.connection);
    this.instanceCache.set(RabbitJobRunner.name, runner);
    return runner;
  }

  public async createSerializer(): Promise<JobSerializerInterface> {
    const cached = this.instanceCache.get(RabbitJobSerializer.name);
    if (cached) return cached as RabbitJobSerializer;

    const serializer = new RabbitJobSerializer();
    this.instanceCache.set(RabbitJobSerializer.name, serializer);
    return serializer;
  }

  public async close(): Promise<void> {
    const runner = this.instanceCache.get(RabbitJobRunner.name);
    if (runner) {
      await (runner as RabbitJobRunner).close();
      this.instanceCache.delete(RabbitJobRunner.name);
    }

    this.instanceCache.delete(RabbitJobSerializer.name);

    if (this.connection) {
      await this.connection.close();
      this.connection = null;
    }
  }
}
