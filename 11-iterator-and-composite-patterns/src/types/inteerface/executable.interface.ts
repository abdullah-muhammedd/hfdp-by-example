export interface Executable extends Iterable<Executable> {
  execute(): Promise<any>;
  getName(): string;
  add(job: Executable): void;
  setInput(...args: any): void;
}
