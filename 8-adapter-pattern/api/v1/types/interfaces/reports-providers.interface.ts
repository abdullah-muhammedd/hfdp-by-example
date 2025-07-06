import { ReportData } from '../../../types/report-data.type';

export interface ReportsProviderInterface {
  generateReport(data: ReportData): Promise<string>;
  getFormat(): string;
}
