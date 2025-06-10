import { JobSerializerInterface } from '../../types/interface/job-serilaizer.interface';

export class BullJobSerializer implements JobSerializerInterface {
  public serialize(data: any): string {
    return JSON.stringify(data);
  }

  public deserialize(serialized: string): any {
    return JSON.parse(serialized);
  }
}
