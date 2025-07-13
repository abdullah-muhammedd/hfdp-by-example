import { Executable } from '../types/inteerface/executable.interface';

export abstract class DataJob implements Executable {
  protected input: any;
  constructor(private name: string) {}

  async execute(): Promise<any> {
    return await this.operation();
  }
  getName(): string {
    return this.name;
  }

  [Symbol.iterator](): Iterator<Executable> {
    let done = false;
    return {
      next: () =>
        done ? { done: true, value: null } : ((done = true), { done: false, value: this }),
    };
  }

  abstract setInput(...args: any): void;

  add(job: Executable): void {
    throw new Error('Method not implemented in leaf');
  }

  protected abstract operation(...args: any[]): Promise<any>;
}
