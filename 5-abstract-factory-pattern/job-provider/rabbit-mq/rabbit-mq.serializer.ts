import { JobSerializerInterface } from '../../types/interface/job-serilaizer.interface';

export class RabbitJobSerializer implements JobSerializerInterface {
  serialize(data: any): string {
    return JSON.stringify(data);
  }

  deserialize(serialized: string): any {
    return JSON.parse(serialized);
  }
}
