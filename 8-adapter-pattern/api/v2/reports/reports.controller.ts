import { Request, Response } from 'express';
import { ReportsService } from './reports.service';
import { ReportData } from '../../types/report-data.type';
import {
  ReportGenerationOptions,
  ReportValidationResult,
  ReportTemplate,
} from '../types/interfaces/reports-providers.interface';

export class ReportsController {
  constructor(private service: ReportsService) {}

  async generateReport(req: Request, res: Response): Promise<void> {
    try {
      const reportData: ReportData = req.body;

      // Validate required fields
      if (!reportData.title || !reportData.content) {
        res.status(500).json({
          success: false,
          error: 'Title and content are required',
        });
        return;
      }

      const path = await this.service.generateReport(reportData);
      res.json({ success: true, path });
    } catch (error) {
      res.status(500).json({ success: false, error: 'Failed to generate report' });
    }
  }

  async generateReportFromTemplate(req: Request, res: Response): Promise<void> {
    try {
      const { templateId, data, options } = req.body;
      const path = await this.service.generateReportFromTemplate(templateId, data, options);
      res.json({ success: true, path });
    } catch (error) {
      res.status(500).json({ success: false, error: 'Failed to generate report from template' });
    }
  }

  async validateReportData(req: Request, res: Response): Promise<void> {
    try {
      const reportData: ReportData = req.body;
      const result: ReportValidationResult = await this.service.validateReportData(reportData);
      res.json({ success: true, result });
    } catch (error) {
      res.status(500).json({ success: false, error: 'Failed to validate report data' });
    }
  }

  async getAvailableTemplates(req: Request, res: Response): Promise<void> {
    try {
      const templates: ReportTemplate[] = await this.service.getAvailableTemplates();
      res.json({ success: true, templates });
    } catch (error) {
      res.status(500).json({ success: false, error: 'Failed to get templates' });
    }
  }

  async createTemplate(req: Request, res: Response): Promise<void> {
    try {
      const template: Omit<ReportTemplate, 'id' | 'metadata'> = req.body;
      const createdTemplate: ReportTemplate = await this.service.createTemplate(template);
      res.json({ success: true, template: createdTemplate });
    } catch (error) {
      res.status(500).json({ success: false, error: 'Failed to create template' });
    }
  }

  async updateTemplate(req: Request, res: Response): Promise<void> {
    try {
      const { templateId } = req.params;
      const template: Partial<ReportTemplate> = req.body;
      const updatedTemplate: ReportTemplate = await this.service.updateTemplate(
        templateId,
        template,
      );
      res.json({ success: true, template: updatedTemplate });
    } catch (error) {
      res.status(500).json({ success: false, error: 'Failed to update template' });
    }
  }

  async deleteTemplate(req: Request, res: Response): Promise<void> {
    try {
      const { templateId } = req.params;
      const deleted: boolean = await this.service.deleteTemplate(templateId);
      res.json({ success: true, deleted });
    } catch (error) {
      res.status(500).json({ success: false, error: 'Failed to delete template' });
    }
  }

  getReportFormat(req: Request, res: Response): void {
    const format = this.service.getFormat();
    res.json({ format });
  }

  getSupportedFormats(req: Request, res: Response): void {
    const formats = this.service.getSupportedFormats();
    res.json({ formats });
  }

  async getReportStatistics(req: Request, res: Response): Promise<void> {
    try {
      const statistics = await this.service.getReportStatistics();
      res.json({ success: true, statistics });
    } catch (error) {
      res.status(500).json({ success: false, error: 'Failed to get statistics' });
    }
  }

  async exportReport(req: Request, res: Response): Promise<void> {
    try {
      const { reportPath, format } = req.body;
      const exportedPath = await this.service.exportReport(reportPath, format);
      res.json({ success: true, path: exportedPath });
    } catch (error) {
      res.status(500).json({ success: false, error: 'Failed to export report' });
    }
  }

  async importReport(req: Request, res: Response): Promise<void> {
    try {
      const { filePath } = req.body;
      const reportData: ReportData = await this.service.importReport(filePath);
      res.json({ success: true, reportData });
    } catch (error) {
      res.status(500).json({ success: false, error: 'Failed to import report' });
    }
  }

  async mergeReports(req: Request, res: Response): Promise<void> {
    try {
      const { reportPaths } = req.body;
      const mergedPath = await this.service.mergeReports(reportPaths);
      res.json({ success: true, path: mergedPath });
    } catch (error) {
      res.status(500).json({ success: false, error: 'Failed to merge reports' });
    }
  }

  async splitReport(req: Request, res: Response): Promise<void> {
    try {
      const { reportPath, sections } = req.body;
      const splitPaths = await this.service.splitReport(reportPath, sections);
      res.json({ success: true, paths: splitPaths });
    } catch (error) {
      res.status(500).json({ success: false, error: 'Failed to split report' });
    }
  }

  async addWatermark(req: Request, res: Response): Promise<void> {
    try {
      const { reportPath, watermarkText } = req.body;
      const watermarkedPath = await this.service.addWatermark(reportPath, watermarkText);
      res.json({ success: true, path: watermarkedPath });
    } catch (error) {
      res.status(500).json({ success: false, error: 'Failed to add watermark' });
    }
  }

  async encryptReport(req: Request, res: Response): Promise<void> {
    try {
      const { reportPath, password } = req.body;
      const encryptedPath = await this.service.encryptReport(reportPath, password);
      res.json({ success: true, path: encryptedPath });
    } catch (error) {
      res.status(500).json({ success: false, error: 'Failed to encrypt report' });
    }
  }

  async decryptReport(req: Request, res: Response): Promise<void> {
    try {
      const { reportPath, password } = req.body;
      const decryptedPath = await this.service.decryptReport(reportPath, password);
      res.json({ success: true, path: decryptedPath });
    } catch (error) {
      res.status(500).json({ success: false, error: 'Failed to decrypt report' });
    }
  }

  async compressReport(req: Request, res: Response): Promise<void> {
    try {
      const { reportPath } = req.body;
      const compressedPath = await this.service.compressReport(reportPath);
      res.json({ success: true, path: compressedPath });
    } catch (error) {
      res.status(500).json({ success: false, error: 'Failed to compress report' });
    }
  }

  async decompressReport(req: Request, res: Response): Promise<void> {
    try {
      const { reportPath } = req.body;
      const decompressedPath = await this.service.decompressReport(reportPath);
      res.json({ success: true, path: decompressedPath });
    } catch (error) {
      res.status(500).json({ success: false, error: 'Failed to decompress report' });
    }
  }

  async validateReportIntegrity(req: Request, res: Response): Promise<void> {
    try {
      const { reportPath } = req.body;
      const isValid = await this.service.validateReportIntegrity(reportPath);
      res.json({ success: true, isValid });
    } catch (error) {
      res.status(500).json({ success: false, error: 'Failed to validate report integrity' });
    }
  }

  async getReportMetadata(req: Request, res: Response): Promise<void> {
    try {
      const { reportPath } = req.body;
      const metadata = await this.service.getReportMetadata(reportPath);
      res.json({ success: true, metadata });
    } catch (error) {
      res.status(500).json({ success: false, error: 'Failed to get report metadata' });
    }
  }

  async updateReportMetadata(req: Request, res: Response): Promise<void> {
    try {
      const { reportPath, metadata } = req.body;
      const updatedPath = await this.service.updateReportMetadata(reportPath, metadata);
      res.json({ success: true, path: updatedPath });
    } catch (error) {
      res.status(500).json({ success: false, error: 'Failed to update report metadata' });
    }
  }

  async archiveReport(req: Request, res: Response): Promise<void> {
    try {
      const { reportPath, archivePath } = req.body;
      const archivedPath = await this.service.archiveReport(reportPath, archivePath);
      res.json({ success: true, path: archivedPath });
    } catch (error) {
      res.status(500).json({ success: false, error: 'Failed to archive report' });
    }
  }

  async restoreReport(req: Request, res: Response): Promise<void> {
    try {
      const { archivePath, restorePath } = req.body;
      const restoredPath = await this.service.restoreReport(archivePath, restorePath);
      res.json({ success: true, path: restoredPath });
    } catch (error) {
      res.status(500).json({ success: false, error: 'Failed to restore report' });
    }
  }

  async scheduleReportGeneration(req: Request, res: Response): Promise<void> {
    try {
      const { data, schedule } = req.body;
      const scheduleId = await this.service.scheduleReportGeneration(data, schedule);
      res.json({ success: true, scheduleId });
    } catch (error) {
      res.status(500).json({ success: false, error: 'Failed to schedule report generation' });
    }
  }

  async cancelScheduledReport(req: Request, res: Response): Promise<void> {
    try {
      const { scheduleId } = req.params;
      const cancelled = await this.service.cancelScheduledReport(scheduleId);
      res.json({ success: true, cancelled });
    } catch (error) {
      res.status(500).json({ success: false, error: 'Failed to cancel scheduled report' });
    }
  }

  async getScheduledReports(req: Request, res: Response): Promise<void> {
    try {
      const scheduledReports = await this.service.getScheduledReports();
      res.json({ success: true, scheduledReports });
    } catch (error) {
      res.status(500).json({ success: false, error: 'Failed to get scheduled reports' });
    }
  }

  async generateMultiPageReport(req: Request, res: Response): Promise<void> {
    try {
      const { data, options } = req.body;
      const path = await this.service.generateMultiPageReport(data, options);
      res.json({ success: true, path });
    } catch (error) {
      res.status(500).json({ success: false, error: 'Failed to generate multi-page report' });
    }
  }

  async addDigitalSignature(req: Request, res: Response): Promise<void> {
    try {
      const { reportPath, certificatePath } = req.body;
      const signedPath = await this.service.addDigitalSignature(reportPath, certificatePath);
      res.json({ success: true, path: signedPath });
    } catch (error) {
      res.status(500).json({ success: false, error: 'Failed to add digital signature' });
    }
  }

  async verifyDigitalSignature(req: Request, res: Response): Promise<void> {
    try {
      const { reportPath } = req.body;
      const isValid = await this.service.verifyDigitalSignature(reportPath);
      res.json({ success: true, isValid });
    } catch (error) {
      res.status(500).json({ success: false, error: 'Failed to verify digital signature' });
    }
  }

  async convertFormat(req: Request, res: Response): Promise<void> {
    try {
      const { reportPath, targetFormat } = req.body;
      const convertedPath = await this.service.convertFormat(reportPath, targetFormat);
      res.json({ success: true, path: convertedPath });
    } catch (error) {
      res.status(500).json({ success: false, error: 'Failed to convert format' });
    }
  }

  async extractTextFromReport(req: Request, res: Response): Promise<void> {
    try {
      const { reportPath } = req.body;
      const text = await this.service.extractTextFromReport(reportPath);
      res.json({ success: true, text });
    } catch (error) {
      res.status(500).json({ success: false, error: 'Failed to extract text from report' });
    }
  }

  async searchInReport(req: Request, res: Response): Promise<void> {
    try {
      const { reportPath, query } = req.body;
      const results = await this.service.searchInReport(reportPath, query);
      res.json({ success: true, results });
    } catch (error) {
      res.status(500).json({ success: false, error: 'Failed to search in report' });
    }
  }

  async addBookmarks(req: Request, res: Response): Promise<void> {
    try {
      const { reportPath, bookmarks } = req.body;
      const bookmarkedPath = await this.service.addBookmarks(reportPath, bookmarks);
      res.json({ success: true, path: bookmarkedPath });
    } catch (error) {
      res.status(500).json({ success: false, error: 'Failed to add bookmarks' });
    }
  }

  async addAnnotations(req: Request, res: Response): Promise<void> {
    try {
      const { reportPath, annotations } = req.body;
      const annotatedPath = await this.service.addAnnotations(reportPath, annotations);
      res.json({ success: true, path: annotatedPath });
    } catch (error) {
      res.status(500).json({ success: false, error: 'Failed to add annotations' });
    }
  }

  async generateTableOfContents(req: Request, res: Response): Promise<void> {
    try {
      const { reportPath } = req.body;
      const tocPath = await this.service.generateTableOfContents(reportPath);
      res.json({ success: true, path: tocPath });
    } catch (error) {
      res.status(500).json({ success: false, error: 'Failed to generate table of contents' });
    }
  }

  async addHeaderFooter(req: Request, res: Response): Promise<void> {
    try {
      const { reportPath, header, footer } = req.body;
      const headerFooterPath = await this.service.addHeaderFooter(reportPath, header, footer);
      res.json({ success: true, path: headerFooterPath });
    } catch (error) {
      res.status(500).json({ success: false, error: 'Failed to add header/footer' });
    }
  }

  async setPageMargins(req: Request, res: Response): Promise<void> {
    try {
      const { reportPath, margins } = req.body;
      const marginPath = await this.service.setPageMargins(reportPath, margins);
      res.json({ success: true, path: marginPath });
    } catch (error) {
      res.status(500).json({ success: false, error: 'Failed to set page margins' });
    }
  }

  async rotatePage(req: Request, res: Response): Promise<void> {
    try {
      const { reportPath, pageNumber, angle } = req.body;
      const rotatedPath = await this.service.rotatePage(reportPath, pageNumber, angle);
      res.json({ success: true, path: rotatedPath });
    } catch (error) {
      res.status(500).json({ success: false, error: 'Failed to rotate page' });
    }
  }

  async deletePage(req: Request, res: Response): Promise<void> {
    try {
      const { reportPath, pageNumber } = req.body;
      const deletedPath = await this.service.deletePage(reportPath, pageNumber);
      res.json({ success: true, path: deletedPath });
    } catch (error) {
      res.status(500).json({ success: false, error: 'Failed to delete page' });
    }
  }

  async insertPage(req: Request, res: Response): Promise<void> {
    try {
      const { reportPath, pageNumber, content } = req.body;
      const insertedPath = await this.service.insertPage(reportPath, pageNumber, content);
      res.json({ success: true, path: insertedPath });
    } catch (error) {
      res.status(500).json({ success: false, error: 'Failed to insert page' });
    }
  }

  async getPageCount(req: Request, res: Response): Promise<void> {
    try {
      const { reportPath } = req.body;
      const pageCount = await this.service.getPageCount(reportPath);
      res.json({ success: true, pageCount });
    } catch (error) {
      res.status(500).json({ success: false, error: 'Failed to get page count' });
    }
  }

  async getPageContent(req: Request, res: Response): Promise<void> {
    try {
      const { reportPath, pageNumber } = req.body;
      const content = await this.service.getPageContent(reportPath, pageNumber);
      res.json({ success: true, content });
    } catch (error) {
      res.status(500).json({ success: false, error: 'Failed to get page content' });
    }
  }

  async setPageBackground(req: Request, res: Response): Promise<void> {
    try {
      const { reportPath, pageNumber, color } = req.body;
      const backgroundPath = await this.service.setPageBackground(reportPath, pageNumber, color);
      res.json({ success: true, path: backgroundPath });
    } catch (error) {
      res.status(500).json({ success: false, error: 'Failed to set page background' });
    }
  }

  async addPageNumbers(req: Request, res: Response): Promise<void> {
    try {
      const { reportPath, format } = req.body;
      const numberedPath = await this.service.addPageNumbers(reportPath, format);
      res.json({ success: true, path: numberedPath });
    } catch (error) {
      res.status(500).json({ success: false, error: 'Failed to add page numbers' });
    }
  }

  async setDocumentProperties(req: Request, res: Response): Promise<void> {
    try {
      const { reportPath, properties } = req.body;
      const propertiesPath = await this.service.setDocumentProperties(reportPath, properties);
      res.json({ success: true, path: propertiesPath });
    } catch (error) {
      res.status(500).json({ success: false, error: 'Failed to set document properties' });
    }
  }

  async getDocumentProperties(req: Request, res: Response): Promise<void> {
    try {
      const { reportPath } = req.body;
      const properties = await this.service.getDocumentProperties(reportPath);
      res.json({ success: true, properties });
    } catch (error) {
      res.status(500).json({ success: false, error: 'Failed to get document properties' });
    }
  }
}
