import { JobProcessorInterface } from './job-processor.interface';
import { JobRunnerInterface } from './job-runner.interface';
import { JobSerializerInterface } from './job-serilaizer.interface';

export interface JobsFactoryInterface {
  createRunner(): Promise<JobRunnerInterface>;
  createSerializer(): Promise<JobSerializerInterface>;
  createProcessor(): Promise<JobProcessorInterface>;
}
