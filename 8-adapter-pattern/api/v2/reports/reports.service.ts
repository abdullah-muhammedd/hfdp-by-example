import { ReportsProvider } from './providers/reports.providers';
import { ReportData } from '../../types/report-data.type';
import {
  ReportGenerationOptions,
  ReportValidationResult,
  ReportTemplate,
} from '../types/interfaces/reports-providers.interface';

export class ReportsService {
  constructor(private provider: ReportsProvider) {}

  async generateReport(data: ReportData, options?: ReportGenerationOptions): Promise<string> {
    return this.provider.generateReport(data, options);
  }

  async generateReportFromTemplate(
    templateId: string,
    data: Partial<ReportData>,
    options?: ReportGenerationOptions,
  ): Promise<string> {
    return this.provider.generateReportFromTemplate(templateId, data, options);
  }

  async validateReportData(data: ReportData): Promise<ReportValidationResult> {
    return this.provider.validateReportData(data);
  }

  async getAvailableTemplates(): Promise<ReportTemplate[]> {
    return this.provider.getAvailableTemplates();
  }

  async createTemplate(template: Omit<ReportTemplate, 'id' | 'metadata'>): Promise<ReportTemplate> {
    return this.provider.createTemplate(template);
  }

  async updateTemplate(
    templateId: string,
    template: Partial<ReportTemplate>,
  ): Promise<ReportTemplate> {
    return this.provider.updateTemplate(templateId, template);
  }

  async deleteTemplate(templateId: string): Promise<boolean> {
    return this.provider.deleteTemplate(templateId);
  }

  getFormat(): string {
    return this.provider.getFormat();
  }

  getSupportedFormats(): string[] {
    return this.provider.getSupportedFormats();
  }

  async getReportStatistics(): Promise<{
    totalGenerated: number;
    totalTemplates: number;
    averageGenerationTime: number;
    mostUsedTemplates: string[];
  }> {
    return this.provider.getReportStatistics();
  }

  async exportReport(reportPath: string, format: string): Promise<string> {
    return this.provider.exportReport(reportPath, format);
  }

  async importReport(filePath: string): Promise<ReportData> {
    return this.provider.importReport(filePath);
  }

  async mergeReports(reportPaths: string[]): Promise<string> {
    return this.provider.mergeReports(reportPaths);
  }

  async splitReport(reportPath: string, sections: string[]): Promise<string[]> {
    return this.provider.splitReport(reportPath, sections);
  }

  async addWatermark(reportPath: string, watermarkText: string): Promise<string> {
    return this.provider.addWatermark(reportPath, watermarkText);
  }

  async encryptReport(reportPath: string, password: string): Promise<string> {
    return this.provider.encryptReport(reportPath, password);
  }

  async decryptReport(reportPath: string, password: string): Promise<string> {
    return this.provider.decryptReport(reportPath, password);
  }

  async compressReport(reportPath: string): Promise<string> {
    return this.provider.compressReport(reportPath);
  }

  async decompressReport(reportPath: string): Promise<string> {
    return this.provider.decompressReport(reportPath);
  }

  async validateReportIntegrity(reportPath: string): Promise<boolean> {
    return this.provider.validateReportIntegrity(reportPath);
  }

  async getReportMetadata(reportPath: string): Promise<ReportData> {
    return this.provider.getReportMetadata(reportPath);
  }

  async updateReportMetadata(reportPath: string, metadata: Partial<ReportData>): Promise<string> {
    return this.provider.updateReportMetadata(reportPath, metadata);
  }

  async archiveReport(reportPath: string, archivePath: string): Promise<string> {
    return this.provider.archiveReport(reportPath, archivePath);
  }

  async restoreReport(archivePath: string, restorePath: string): Promise<string> {
    return this.provider.restoreReport(archivePath, restorePath);
  }

  async scheduleReportGeneration(
    data: ReportData,
    schedule: {
      frequency: 'once' | 'daily' | 'weekly' | 'monthly';
      time: string;
      timezone: string;
      endDate?: Date;
    },
  ): Promise<string> {
    return this.provider.scheduleReportGeneration(data, schedule);
  }

  async cancelScheduledReport(scheduleId: string): Promise<boolean> {
    return this.provider.cancelScheduledReport(scheduleId);
  }

  async getScheduledReports(): Promise<
    Array<{
      id: string;
      data: ReportData;
      schedule: any;
      status: 'active' | 'paused' | 'completed' | 'failed';
    }>
  > {
    return this.provider.getScheduledReports();
  }

  async generateMultiPageReport(
    data: ReportData[],
    options?: ReportGenerationOptions,
  ): Promise<string> {
    return this.provider.generateMultiPageReport(data, options);
  }

  async addDigitalSignature(reportPath: string, certificatePath: string): Promise<string> {
    return this.provider.addDigitalSignature(reportPath, certificatePath);
  }

  async verifyDigitalSignature(reportPath: string): Promise<boolean> {
    return this.provider.verifyDigitalSignature(reportPath);
  }

  async convertFormat(reportPath: string, targetFormat: string): Promise<string> {
    return this.provider.convertFormat(reportPath, targetFormat);
  }

  async extractTextFromReport(reportPath: string): Promise<string> {
    return this.provider.extractTextFromReport(reportPath);
  }

  async searchInReport(
    reportPath: string,
    query: string,
  ): Promise<
    Array<{
      page: number;
      context: string;
      position: number;
    }>
  > {
    return this.provider.searchInReport(reportPath, query);
  }

  async addBookmarks(
    reportPath: string,
    bookmarks: Array<{
      title: string;
      page: number;
      level: number;
    }>,
  ): Promise<string> {
    return this.provider.addBookmarks(reportPath, bookmarks);
  }

  async addAnnotations(
    reportPath: string,
    annotations: Array<{
      type: 'text' | 'highlight' | 'strikeout' | 'underline';
      page: number;
      x: number;
      y: number;
      width: number;
      height: number;
      content?: string;
      color?: string;
    }>,
  ): Promise<string> {
    return this.provider.addAnnotations(reportPath, annotations);
  }

  async generateTableOfContents(reportPath: string): Promise<string> {
    return this.provider.generateTableOfContents(reportPath);
  }

  async addHeaderFooter(reportPath: string, header?: string, footer?: string): Promise<string> {
    return this.provider.addHeaderFooter(reportPath, header, footer);
  }

  async setPageMargins(
    reportPath: string,
    margins: {
      top: number;
      bottom: number;
      left: number;
      right: number;
    },
  ): Promise<string> {
    return this.provider.setPageMargins(reportPath, margins);
  }

  async rotatePage(reportPath: string, pageNumber: number, angle: 90 | 180 | 270): Promise<string> {
    return this.provider.rotatePage(reportPath, pageNumber, angle);
  }

  async deletePage(reportPath: string, pageNumber: number): Promise<string> {
    return this.provider.deletePage(reportPath, pageNumber);
  }

  async insertPage(reportPath: string, pageNumber: number, content: string): Promise<string> {
    return this.provider.insertPage(reportPath, pageNumber, content);
  }

  async getPageCount(reportPath: string): Promise<number> {
    return this.provider.getPageCount(reportPath);
  }

  async getPageContent(reportPath: string, pageNumber: number): Promise<string> {
    return this.provider.getPageContent(reportPath, pageNumber);
  }

  async setPageBackground(reportPath: string, pageNumber: number, color: string): Promise<string> {
    return this.provider.setPageBackground(reportPath, pageNumber, color);
  }

  async addPageNumbers(reportPath: string, format?: string): Promise<string> {
    return this.provider.addPageNumbers(reportPath, format);
  }

  async setDocumentProperties(
    reportPath: string,
    properties: {
      title?: string;
      author?: string;
      subject?: string;
      keywords?: string[];
      creator?: string;
      producer?: string;
    },
  ): Promise<string> {
    return this.provider.setDocumentProperties(reportPath, properties);
  }

  async getDocumentProperties(reportPath: string): Promise<{
    title?: string;
    author?: string;
    subject?: string;
    keywords?: string[];
    creator?: string;
    producer?: string;
    creationDate?: Date;
    modificationDate?: Date;
  }> {
    return this.provider.getDocumentProperties(reportPath);
  }
}
