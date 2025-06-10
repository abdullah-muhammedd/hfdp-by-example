import { Worker, Job } from 'bullmq';
import { Redis } from 'ioredis';
import { JobProcessorInterface } from '../../types/interface/job-processor.interface';
import { setTimeout } from 'timers/promises';
import { JobSerializerInterface } from '../../types/interface/job-serilaizer.interface';

export class BullJobProcessor implements JobProcessorInterface {
  constructor(
    private queueName: string,
    private redis: Redis,
  ) {}

  async process(serializer: JobSerializerInterface): Promise<void> {
    const worker = new Worker(
      this.queueName,
      async (job: Job) => {
        console.log(`[BullMQ] Processing job "${job.queueName}" with payload:`, job.data);
        await setTimeout(2000);
      },
      { connection: this.redis },
    );

    worker.on('completed', (job) => {
      const content = serializer.deserialize(job.data);
      console.log(`[BullMQ] Job "${job.queueName}" completed with payload:`, content);
    });

    worker.on('failed', (job, err) => {
      console.error(`[BullMQ] Job "${job}" failed:`, err);
    });
  }
}
