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
        const content = serializer.deserialize(job.data);
        console.log(`[BullMQ] Processing job "${content.jobName}" with payload:`, content.payload); // It is always better to create a strictt type for your jobs payloads
        await setTimeout(2000); // Simulate long processing time
      },
      { connection: this.redis },
    );

    worker.on('completed', (job) => {
      const content = serializer.deserialize(job.data);
      console.log(`[BullMQ] Job "${content.jobName}" completed with payload:`, content.payload);
    });

    worker.on('failed', (job, err) => {
      console.error(`[BullMQ] Job "${job}" failed:`, err);
    });
  }
}
