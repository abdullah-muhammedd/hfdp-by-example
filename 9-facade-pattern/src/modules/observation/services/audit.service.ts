import { AuditLog } from '../../../types/audit-log.type';
import * as fs from 'fs';
import * as path from 'path';

function toKebabCase(str: string): string {
  return str
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .replace(/\s+/g, '-')
    .toLowerCase();
}

export class AuditService {
  private reportsDir = path.resolve(process.cwd(), 'reports');
  private filePath = path.join(this.reportsDir, 'audit-log.log');

  async record(log: AuditLog): Promise<void> {
    await fs.promises.mkdir(this.reportsDir, { recursive: true });
    const entry = {
      ...log,
      timestamp: log.timestamp.toISOString(),
    };
    await fs.promises.appendFile(this.filePath, JSON.stringify(entry) + '\n', 'utf8');
  }
}
