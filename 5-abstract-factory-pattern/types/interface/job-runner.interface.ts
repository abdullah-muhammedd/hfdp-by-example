export interface JobRunnerInterface {
  publish(jobName: string, payload: string): Promise<void>;
}
