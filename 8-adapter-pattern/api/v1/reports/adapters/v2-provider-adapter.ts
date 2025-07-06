import { ReportsProviderInterface as V1ReportsProviderInterface } from '../../types/interfaces/reports-providers.interface';
import { ReportsProviderInterface as V2ReportsProviderInterface } from '../../../v2/types/interfaces/reports-providers.interface';
import { ReportData } from '../../../types/report-data.type';

export class V2ProviderAdapter implements V1ReportsProviderInterface {
  constructor(private v2Provider: V2ReportsProviderInterface) {}

  async generateReport(data: ReportData): Promise<string> {
    // Convert v1 simple call to v2 call with default options
    return this.v2Provider.generateReport(data, {
      format: 'pdf',
      quality: 'medium',
      watermark: false,
      encryption: false,
      compression: false,
    });
  }

  getFormat(): string {
    return this.v2Provider.getFormat();
  }
}
