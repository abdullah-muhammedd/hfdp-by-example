import fs from 'fs/promises';
import path from 'path';
import { DataJob } from './data.job';

export class LoadJob extends DataJob {
  constructor(
    protected input: any[],
    private outFile: string, // summary file
    private fullDumpFile: string, // raw full dump file
  ) {
    super('Load');
  }

  setInput(...args: any): void {
    this.input = args[0];
  }

  protected async operation(): Promise<void> {
    const summaryPath = path.resolve(this.outFile);
    const fullPath = path.resolve(this.fullDumpFile);

    // Ensure directories exist
    await fs.mkdir(path.dirname(summaryPath), { recursive: true });
    await fs.mkdir(path.dirname(fullPath), { recursive: true });

    // Write summary
    const lines = this.input.map(
      (row) => `sensorId=${row.sensorId}, value=${row.value}, timestamp=${row.timestamp}`,
    );
    await fs.writeFile(summaryPath, lines.join('\n'), 'utf-8');
    console.log(`${this.getName()} Wrote summary of ${lines.length} records to ${this.outFile}`);

    // Write full JSON
    const fullJson = JSON.stringify(this.input, null, 2);
    await fs.writeFile(fullPath, fullJson, 'utf-8');
    console.log(`${this.getName()} Wrote full raw data to ${this.fullDumpFile}`);
  }
}
