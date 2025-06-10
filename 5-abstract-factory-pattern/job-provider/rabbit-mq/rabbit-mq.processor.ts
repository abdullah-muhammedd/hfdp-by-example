import { Channel, Connection } from 'amqplib';
import { JobProcessorInterface } from '../../types/interface/job-processor.interface';
import { setTimeout } from 'timers/promises';
import { JobSerializerInterface } from './../../types/interface/job-serilaizer.interface';

export class RabbitJobProcessor implements JobProcessorInterface {
  private channel: Channel | any | null = null;

  constructor(
    private queueName: string,
    private connection: Connection | any,
  ) {}

  async process(serializer: JobSerializerInterface): Promise<void> {
    this.channel = await this.connection.createChannel();
    await this.channel.assertQueue(this.queueName, { durable: true });

    this.channel.consume(this.queueName, async (msg: any) => {
      if (msg !== null) {
        const content = serializer.deserialize(msg.content.toString());
        console.log(
          `[RabbitMQ] Processing job "${content.jobName}" with payload:`,
          content.payload,
        );
        await setTimeout(2000); // Simulate processing time
        this.channel!.ack(msg);
      }
    });
  }
}
