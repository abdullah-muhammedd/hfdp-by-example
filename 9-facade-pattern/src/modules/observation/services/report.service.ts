import { ReportOptions } from '../../../types/report-options.type';
import * as fs from 'fs';
import * as path from 'path';

function toKebabCase(str: string): string {
  return str
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .replace(/\s+/g, '-')
    .toLowerCase();
}

export class ReportService {
  async generateReport(options: ReportOptions): Promise<string> {
    const timestamp = options.createdAt?.toISOString() || new Date().toISOString();
    const kebabName = toKebabCase(options.reportName);
    const fileName = `${kebabName}-${timestamp.replace(/[:.]/g, '-')}.txt`;
    const reportsDir = path.resolve(process.cwd(), 'reports');
    const filePath = path.join(reportsDir, fileName);
    const tags = options.tags ? `Tags: ${options.tags.join(', ')}\n` : '';
    const content = `Report: ${options.reportName}\nCreated At: ${timestamp}\n${tags}\n${options.content}\n`;
    await fs.promises.mkdir(reportsDir, { recursive: true });
    await fs.promises.writeFile(filePath, content, 'utf8');
    return filePath;
  }
}
