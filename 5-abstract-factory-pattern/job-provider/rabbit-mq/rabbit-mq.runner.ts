import { JobRunnerInterface } from '../../types/interface/job-runner.interface';
import * as amqplib from 'amqplib';

interface JobMessage<T = any> {
  jobName: string;
  payload: T;
}

export class RabbitJobRunner implements JobRunnerInterface {
  private channel: amqplib.Channel | any | null = null;
  private isInitializing = false;
  private retryAttempts = 0;
  private readonly MAX_RETRIES = 3;

  constructor(
    private readonly queueName: string,
    private readonly connection: amqplib.Connection | any,
  ) {}

  private async initChannel(): Promise<void> {
    if (this.channel) return;
    if (this.isInitializing) {
      return this.initChannel();
    }

    this.isInitializing = true;

    try {
      this.channel = await this.connection.createChannel();
      await this.channel.assertQueue(this.queueName, { durable: true });

      this.channel.on('close', () => {
        console.warn('[RabbitMQ] Channel closed');
        this.channel = null;
      });

      this.channel.on('error', (err: Error) => {
        console.warn('[RabbitMQ] Channel error:', err.message);
        this.channel = null;
      });

      this.retryAttempts = 0;
    } catch (error: any) {
      this.channel = null;
      if (this.retryAttempts < this.MAX_RETRIES) {
        this.retryAttempts++;
        console.warn(
          `[RabbitMQ] Channel creation failed, retrying (${this.retryAttempts}/${this.MAX_RETRIES})`,
        );
        await new Promise((resolve) => setTimeout(resolve, 1000)); // Wait for a while before retrying again
        return this.initChannel();
      }
      throw new Error(
        `Failed to initialize RabbitMQ channel after ${this.MAX_RETRIES} attempts: ${error?.message || error}`,
      );
    } finally {
      this.isInitializing = false;
    }
  }

  async publish(jobName: string, payload: string): Promise<void> {
    await this.initChannel();

    if (!this.channel) {
      throw new Error('RabbitMQ channel not available');
    }

    const messageBuffer = Buffer.from(payload);

    const sent = this.channel.sendToQueue(this.queueName, messageBuffer, { persistent: true });

    if (!sent) {
      throw new Error(`Channel is full, could not enqueue job "${jobName}"`);
    }

    console.log(`[RabbitMQ] Job "${jobName}" added to queue`);
  }

  async close(): Promise<void> {
    if (!this.channel) return;

    try {
      await this.channel.close();
    } catch (error: any) {
      console.error('[RabbitMQ] Error closing channel:', error?.message || error);
    } finally {
      this.channel = null;
    }
  }
}
