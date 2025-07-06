// api/v1/reports/providers/reports-provider.ts

import { ReportsProviderInterface } from '../../types/interfaces/reports-providers.interface';
import { Document, Packer, Paragraph, TextRun } from 'docx';
import * as fs from 'fs';
import * as path from 'path';
import { ReportData } from '../../../types/report-data.type';

export class ReportsProvider implements ReportsProviderInterface {
  async generateReport(data: ReportData): Promise<string> {
    const fileName = `report-${Date.now()}.docx`;
    const reportsDir = path.join(process.cwd(), 'generated-reports');
    const filePath = path.join(reportsDir, fileName);

    // Ensure directory exists
    if (!fs.existsSync(reportsDir)) {
      fs.mkdirSync(reportsDir, { recursive: true });
    }

    // Generate DOCX with structured data
    const doc = new Document({
      sections: [
        {
          properties: {},
          children: [
            new Paragraph({
              children: [new TextRun({ text: data.title || '', bold: true, size: 32 })],
            }),
            new Paragraph({
              children: [new TextRun({ text: data.content || '' })],
            }),
            ...(data.author
              ? [
                  new Paragraph({
                    children: [new TextRun({ text: `Author: ${data.author}`, italics: true })],
                  }),
                ]
              : []),
            ...(data.date instanceof Date && !isNaN(data.date.getTime())
              ? [
                  new Paragraph({
                    children: [
                      new TextRun({
                        text: `Date: ${data.date.toLocaleDateString()}`,
                        italics: true,
                      }),
                    ],
                  }),
                ]
              : []),
          ],
        },
      ],
    });

    const buffer = await Packer.toBuffer(doc);
    fs.writeFileSync(filePath, buffer);

    console.log(`[ReportsProvider] Wrote .docx report to ${filePath}`);

    return filePath;
  }

  getFormat(): string {
    return '.docx';
  }
}
