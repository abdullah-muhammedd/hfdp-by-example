import { JobSerializerInterface } from './job-serilaizer.interface';

export interface JobProcessorInterface {
  process(serializer: JobSerializerInterface): Promise<void>;
}
