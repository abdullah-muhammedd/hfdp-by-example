// src/factories/BullJobsFactory.ts
import { Queue } from 'bullmq';
import IORedis, { Redis } from 'ioredis';
import { JobsFactoryInterface } from './../../types/interface/job-factory.interface';
import { JobRunnerInterface } from './../../types/interface/job-runner.interface';
import { JobSerializerInterface } from './../../types/interface/job-serilaizer.interface';
import { BullJobRunner } from './bull-mq.runner';
import { BullJobSerializer } from './bull-mq.serializer';
import { JobProcessorInterface } from '../../types/interface/job-processor.interface';
import { BullJobProcessor } from './bull-mq.processor';
import { BULLCONFIG } from './bull-mq.config';

export class BullJobsFactory implements JobsFactoryInterface {
  private redis: Redis;
  private instanceCache = new Map<string, BullJobRunner | BullJobSerializer | BullJobProcessor>();

  constructor(private queueName = BULLCONFIG.queueName) {
    this.queueName = queueName;
    this.redis = new IORedis({
      port: BULLCONFIG.redisPort,
      maxRetriesPerRequest: null, // Must be null for BULL
    });
    this.redis.on('error', (err) => {
      console.error('[BullMQ] Redis error:', err);
    });
  }

  public async createProcessor(): Promise<JobProcessorInterface> {
    const cached = this.instanceCache.get(BullJobProcessor.name);
    if (cached) return cached as BullJobProcessor;

    const processor = new BullJobProcessor(this.queueName, this.redis);
    this.instanceCache.set(BullJobProcessor.name, processor);
    return processor;
  }

  public async createRunner(): Promise<JobRunnerInterface> {
    const cached = this.instanceCache.get(BullJobRunner.name);
    if (cached) return cached as BullJobRunner;

    const runner = new BullJobRunner(this.queueName, this.redis);
    this.instanceCache.set(BullJobRunner.name, runner);
    return runner;
  }

  public async createSerializer(): Promise<JobSerializerInterface> {
    const cached = this.instanceCache.get(BullJobSerializer.name);
    if (cached) return cached as BullJobSerializer;

    const serializer = new BullJobSerializer();
    this.instanceCache.set(BullJobSerializer.name, serializer);
    return serializer;
  }

  public async close(): Promise<void> {
    if (this.redis.status !== 'end') {
      await this.redis.quit();
      console.log('[BullMQ] Redis connection closed.');
    } else {
      console.warn('[BullMQ] Redis connection was already closed.');
    }
  }
}
