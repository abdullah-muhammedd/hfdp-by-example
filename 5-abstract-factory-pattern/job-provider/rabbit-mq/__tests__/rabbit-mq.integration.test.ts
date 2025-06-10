import { RabbitJobsFactory } from '../rabbit-mq.factory';
import { RabbitJobRunner } from '../rabbit-mq.runner';
import { RabbitJobSerializer } from '../rabbit-mq.serializer';

describe('RabbitMQ Integration Tests', () => {
  let factory: RabbitJobsFactory;
  let runner: RabbitJobRunner;
  let serializer: RabbitJobSerializer;

  beforeEach(async () => {
    factory = new RabbitJobsFactory('test-queue');
    runner = (await factory.createRunner()) as RabbitJobRunner;
    serializer = (await factory.createSerializer()) as RabbitJobSerializer;
  });

  afterEach(async () => {
    await runner.close();
    await factory.close();
  });

  it('should create a runner and serializer', () => {
    expect(runner).toBeInstanceOf(RabbitJobRunner);
    expect(serializer).toBeInstanceOf(RabbitJobSerializer);
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
    await runner.publish(jobName, payload);
  });
});
