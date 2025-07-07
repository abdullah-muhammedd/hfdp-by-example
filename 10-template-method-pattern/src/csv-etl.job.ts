import { FileETLJob } from './file-etl.job';
import * as fs from 'fs';
import { parse } from 'csv-parse';

export class CsvETLJob extends FileETLJob {
  private filePath: string;

  constructor(filePath: string) {
    super();
    this.filePath = filePath;
  }

  protected async extract(): Promise<any[]> {
    if (!fs.existsSync(this.filePath)) {
      throw new Error(`File not found: ${this.filePath}`);
    }
    const fileContent = fs.readFileSync(this.filePath, 'utf8');
    return new Promise<any[]>((resolve, reject) => {
      parse(
        fileContent,
        {
          columns: true,
          skip_empty_lines: true,
          trim: true,
        },
        (err, records: any[]) => {
          if (err) return reject(err);
          resolve(records);
        },
      );
    });
  }
}
