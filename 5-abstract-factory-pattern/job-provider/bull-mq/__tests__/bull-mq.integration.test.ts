import { BullJobsFactory } from '../bull-mq.factory';
import { BullJobRunner } from '../bull-mq.runner';
import { BullJobSerializer } from '../bull-mq.serializer';

describe('BullMQ Integration Tests', () => {
  let factory: BullJobsFactory;
  let runner: BullJobRunner;
  let serializer: BullJobSerializer;

  beforeEach(async () => {
    factory = new BullJobsFactory('test-queue');
    runner = (await factory.createRunner()) as BullJobRunner;
    serializer = (await factory.createSerializer()) as BullJobSerializer;
  });

  afterEach(async () => {
    await factory.close();
  });

  it('should create a runner and serializer', () => {
    expect(runner).toBeInstanceOf(BullJobRunner);
    expect(serializer).toBeInstanceOf(BullJobSerializer);
  });

  it('should serialize and deserialize job data correctly', () => {
    const testData = { key: 'value', number: 123 };
    const serialized = serializer.serialize(testData);
    const deserialized = serializer.deserialize(serialized);
    expect(deserialized).toEqual(testData);
  });

  it('should add a job to the queue', async () => {
    const jobName = 'test-job';
    const payload = { data: 'test-payload' };
    const serialized = serializer.serialize(payload);
    await runner.publish(jobName, serialized);
  });
});
