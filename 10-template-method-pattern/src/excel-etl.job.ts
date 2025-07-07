import { FileETLJob } from './file-etl.job';
import * as XLSX from 'xlsx';
import * as fs from 'fs';

export class ExcelETLJob extends FileETLJob {
  private filePath: string;

  constructor(filePath: string) {
    super();
    this.filePath = filePath;
  }

  protected async extract(): Promise<any[]> {
    if (!fs.existsSync(this.filePath)) {
      throw new Error(`File not found: ${this.filePath}`);
    }
    const workbook = XLSX.readFile(this.filePath);
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    const data = XLSX.utils.sheet_to_json(worksheet, { defval: null });
    return data;
  }
}
