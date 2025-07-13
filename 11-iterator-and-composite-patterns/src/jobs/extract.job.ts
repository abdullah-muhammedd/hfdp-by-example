import fs from 'fs/promises';
import path from 'path';
import { parse } from 'csv-parse';
import { DataJob } from './data.job';

export class ExtractJob extends DataJob {
  constructor(private filePath: string) {
    super('Extract');
  }

  setInput(...args: any): void {
    this.input = args[0];
  }

  protected async operation(): Promise<any[]> {
    const fullPath = path.resolve(this.filePath);
    const content = await fs.readFile(fullPath, 'utf-8');
    const records: any[] = [];
    const parser = parse(content, {
      columns: true,
      skip_empty_lines: true,
    });

    for await (const record of parser) {
      records.push(record);
    }

    console.log(`${this.getName()} Read ${records.length} rows from ${this.filePath}`);
    return records;
  }
}
