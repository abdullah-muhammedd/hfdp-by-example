import { Queue } from 'bullmq';
import { Redis } from 'ioredis';
import { JobRunnerInterface } from '../../types/interface/job-runner.interface';

export class BullJobRunner implements JobRunnerInterface {
  private queue: Queue;

  constructor(queueName: string, redis: Redis) {
    this.queue = new Queue(queueName, { connection: redis });
  }

  public async publish(jobName: string, payload: any): Promise<void> {
    await this.queue.add(jobName, payload);
    console.log(`[BullMQ] Job "${jobName}" added to queue with payload:`, payload);
  }
}
