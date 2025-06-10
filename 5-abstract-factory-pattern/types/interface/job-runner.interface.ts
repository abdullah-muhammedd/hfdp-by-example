export interface JobRunnerInterface {
  publish(jobName: string, payload: any): Promise<void>;
}
