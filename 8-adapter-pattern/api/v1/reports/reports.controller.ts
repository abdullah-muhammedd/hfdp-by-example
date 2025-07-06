// api/v1/reports/reports.controller.ts

import { Request, Response } from 'express';
import { ReportsService } from './reports.service';
import { ReportData } from '../../types/report-data.type';

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

  getReportFormat(req: Request, res: Response): void {
    const format = this.service.getFormat();
    res.json({ format });
  }
}
