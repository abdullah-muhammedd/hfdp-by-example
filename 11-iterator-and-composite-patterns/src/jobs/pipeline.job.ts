import { Executable } from '../types/inteerface/executable.interface';

export class PipelineJob implements Executable {
  private components: Executable[] = [];

  constructor(private name: string) {}

  async execute(): Promise<any> {}

  getName(): string {
    return this.name;
  }
  setInput(...args: any): void {
    throw new Error('Method not implemented in composite');
  }
  *[Symbol.iterator](): Iterator<Executable> {
    yield this;

    for (const child of this.components) {
      yield* child; // Works as long as child is also Iterable<Executable>
    }
  }

  //   [Symbol.iterator](): Iterator<Executable> {
  //     const stack: Executable[] = [this];

  //     return {
  //       next(): IteratorResult<Executable> {
  //         while (stack.length > 0) {
  //           const current = stack.pop();
  //           if (!current) continue;

  //           // Push children of composites in reverse (DFS pre-order)
  //           const isIterable = typeof current[Symbol.iterator] === 'function';

  //           if (isIterable && current !== this) {
  //             // Add children only if current is iterable and not the root
  //             const children = [...current];
  //             stack.push(...children.reverse());
  //           }

  //           return { value: current, done: false };
  //         }

  //         return { value: null, done: true };
  //       },
  //     };
  //   }
  add(job: Executable): void {
    this.components.push(job);
  }
}
