import { DataJob } from './data.job';

export class CleanJob extends DataJob {
  constructor(protected input: any[]) {
    super('Clean');
  }

  setInput(...args: any): void {
    this.input = args[0];
  }
  protected async operation(): Promise<any[]> {
    const cleaned = this.input
      .filter((row) => row.value && !isNaN(row.value))
      .map((row) => ({
        ...row,
        value: Math.min(Math.max(Number(row.value), 0), 100),
      }));

    console.log(`${this.getName()} Kept ${cleaned.length} clean records`);
    return cleaned;
  }
}
