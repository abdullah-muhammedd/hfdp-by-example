import { ReportData } from '../../../types/report-data.type';

export interface ReportSection {
  id: string;
  title: string;
  content: string;
  type: 'text' | 'table' | 'chart' | 'image';
  order: number;
  visible: boolean;
  style?: {
    backgroundColor?: string;
    borderColor?: string;
    borderWidth?: number;
  };
  data?: any;
}

export interface ReportGenerationOptions {
  includeSections?: string[];
  excludeSections?: string[];
  format?: 'pdf' | 'html' | 'txt' | 'xml';
  template?: string;
  watermark?: boolean;
  encryption?: boolean;
  compression?: boolean;
  quality?: 'low' | 'medium' | 'high';
  orientation?: 'portrait' | 'landscape';
  pageSize?: 'A4' | 'A3' | 'Letter' | 'Legal';
}

export interface ReportValidationResult {
  isValid: boolean;
  errors: string[];
  warnings: string[];
  suggestions: string[];
}

export interface ReportTemplate {
  id: string;
  name: string;
  description: string;
  sections: ReportSection[];
  metadata: {
    version: string;
    author: string;
    created: Date;
    lastModified: Date;
  };
}

export interface ReportsProviderInterface {
  generateReport(data: ReportData, options?: ReportGenerationOptions): Promise<string>;
  generateReportFromTemplate(
    templateId: string,
    data: Partial<ReportData>,
    options?: ReportGenerationOptions,
  ): Promise<string>;
  validateReportData(data: ReportData): Promise<ReportValidationResult>;
  getAvailableTemplates(): Promise<ReportTemplate[]>;
  createTemplate(template: Omit<ReportTemplate, 'id' | 'metadata'>): Promise<ReportTemplate>;
  updateTemplate(templateId: string, template: Partial<ReportTemplate>): Promise<ReportTemplate>;
  deleteTemplate(templateId: string): Promise<boolean>;
  getFormat(): string;
  getSupportedFormats(): string[];
  getReportStatistics(): Promise<{
    totalGenerated: number;
    totalTemplates: number;
    averageGenerationTime: number;
    mostUsedTemplates: string[];
  }>;
  exportReport(reportPath: string, format: string): Promise<string>;
  importReport(filePath: string): Promise<ReportData>;
  mergeReports(reportPaths: string[]): Promise<string>;
  splitReport(reportPath: string, sections: string[]): Promise<string[]>;
  addWatermark(reportPath: string, watermarkText: string): Promise<string>;
  encryptReport(reportPath: string, password: string): Promise<string>;
  decryptReport(reportPath: string, password: string): Promise<string>;
  compressReport(reportPath: string): Promise<string>;
  decompressReport(reportPath: string): Promise<string>;
  validateReportIntegrity(reportPath: string): Promise<boolean>;
  getReportMetadata(reportPath: string): Promise<ReportData>;
  updateReportMetadata(reportPath: string, metadata: Partial<ReportData>): Promise<string>;
  archiveReport(reportPath: string, archivePath: string): Promise<string>;
  restoreReport(archivePath: string, restorePath: string): Promise<string>;
  scheduleReportGeneration(
    data: ReportData,
    schedule: {
      frequency: 'once' | 'daily' | 'weekly' | 'monthly';
      time: string;
      timezone: string;
      endDate?: Date;
    },
  ): Promise<string>;
  cancelScheduledReport(scheduleId: string): Promise<boolean>;
  getScheduledReports(): Promise<
    Array<{
      id: string;
      data: ReportData;
      schedule: any;
      status: 'active' | 'paused' | 'completed' | 'failed';
    }>
  >;
  generateMultiPageReport(data: ReportData[], options?: ReportGenerationOptions): Promise<string>;
  addDigitalSignature(reportPath: string, certificatePath: string): Promise<string>;
  verifyDigitalSignature(reportPath: string): Promise<boolean>;
  convertFormat(reportPath: string, targetFormat: string): Promise<string>;
  extractTextFromReport(reportPath: string): Promise<string>;
  searchInReport(
    reportPath: string,
    query: string,
  ): Promise<
    Array<{
      page: number;
      context: string;
      position: number;
    }>
  >;
  addBookmarks(
    reportPath: string,
    bookmarks: Array<{
      title: string;
      page: number;
      level: number;
    }>,
  ): Promise<string>;
  addAnnotations(
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
  ): Promise<string>;
  generateTableOfContents(reportPath: string): Promise<string>;
  addHeaderFooter(reportPath: string, header?: string, footer?: string): Promise<string>;
  setPageMargins(
    reportPath: string,
    margins: {
      top: number;
      bottom: number;
      left: number;
      right: number;
    },
  ): Promise<string>;
  rotatePage(reportPath: string, pageNumber: number, angle: 90 | 180 | 270): Promise<string>;
  deletePage(reportPath: string, pageNumber: number): Promise<string>;
  insertPage(reportPath: string, pageNumber: number, content: string): Promise<string>;
  getPageCount(reportPath: string): Promise<number>;
  getPageContent(reportPath: string, pageNumber: number): Promise<string>;
  setPageBackground(reportPath: string, pageNumber: number, color: string): Promise<string>;
  addPageNumbers(reportPath: string, format?: string): Promise<string>;
  setDocumentProperties(
    reportPath: string,
    properties: {
      title?: string;
      author?: string;
      subject?: string;
      keywords?: string[];
      creator?: string;
      producer?: string;
    },
  ): Promise<string>;
  getDocumentProperties(reportPath: string): Promise<{
    title?: string;
    author?: string;
    subject?: string;
    keywords?: string[];
    creator?: string;
    producer?: string;
    creationDate?: Date;
    modificationDate?: Date;
  }>;
}
