// api/v1/reports/reports.service.ts

import { ReportsProvider } from './providers/reports.providers';
import { ReportData } from '../../types/report-data.type';

export class ReportsService {
  constructor(private provider: ReportsProvider) {}
  async generateReport(data: ReportData): Promise<string> {
    return this.provider.generateReport(data);
  }

  getFormat(): string {
    return this.provider.getFormat();
  }
}
