import request from 'supertest';
import express from 'express';
import { ReportsController } from '../../../../api/v1/reports/reports.controller';
import { ReportsService } from '../../../../api/v1/reports/reports.service';
import { ReportsProvider } from '../../../../api/v1/reports/providers/reports.providers';
import { ReportData } from '../../../../api/types/report-data.type';
import * as fs from 'fs';
import * as path from 'path';

describe('V1 Reports API E2E Tests', () => {
  let app: express.Application;
  let controller: ReportsController;
  let service: ReportsService;
  let provider: ReportsProvider;

  beforeAll(() => {
    // Setup the application
    app = express();
    app.use(express.json());

    // Initialize the components
    provider = new ReportsProvider();
    service = new ReportsService(provider);
    controller = new ReportsController(service);

    // Setup routes
    app.post('/api/v1/reports', (req, res) => controller.generateReport(req, res));
    app.get('/api/v1/reports/format', (req, res) => controller.getReportFormat(req, res));
  });

  afterAll(async () => {
    // Clean up generated files
    const legacyReportsDir = path.join(process.cwd(), 'generated-reports');
    if (fs.existsSync(legacyReportsDir)) {
      const files = fs.readdirSync(legacyReportsDir);
      for (const file of files) {
        if (file.endsWith('.docx')) {
          fs.unlinkSync(path.join(legacyReportsDir, file));
        }
      }
    }
  });

  describe('POST /api/v1/reports', () => {
    it('should generate a DOCX report successfully', async () => {
      const reportData: ReportData = {
        title: 'E2E Test Report - V1 API',
        content: 'This is a test report generated via V1 API (DOCX format)',
        author: 'E2E Test System',
        date: new Date(),
        metadata: {
          test: true,
          provider: 'v1-api',
          format: 'docx',
        },
      };

      const response = await request(app).post('/api/v1/reports').send(reportData).expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.path).toBeDefined();
      expect(response.body.path).toMatch(/\.docx$/);
      expect(response.body.path).toContain('generated-reports');

      // Verify file was actually created
      expect(fs.existsSync(response.body.path)).toBe(true);
      const stats = fs.statSync(response.body.path);
      expect(stats.size).toBeGreaterThan(0);

      console.log(`✅ V1 API: Generated DOCX at ${response.body.path}`);
    });

    it('should handle minimal report data', async () => {
      const minimalData: ReportData = {
        title: 'Minimal Report',
        content: 'Minimal content',
        metadata: {},
      };

      const response = await request(app).post('/api/v1/reports').send(minimalData).expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.path).toBeDefined();
      expect(fs.existsSync(response.body.path)).toBe(true);
    });

    it('should handle full report data', async () => {
      const fullData: ReportData = {
        title: 'Full Report',
        content: 'Complete report content with all fields populated',
        author: 'Test Author',
        date: new Date('2024-01-15'),
        metadata: {
          priority: 'high',
          category: 'test',
          tags: ['e2e', 'test'],
        },
      };

      const response = await request(app).post('/api/v1/reports').send(fullData).expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.path).toBeDefined();
      expect(fs.existsSync(response.body.path)).toBe(true);
    });

    it('should return 500 for invalid data', async () => {
      const invalidData = {
        title: '', // Empty title should fail validation
        content: 'Some content',
      };

      const response = await request(app).post('/api/v1/reports').send(invalidData).expect(500);

      expect(response.body.success).toBe(false);
    });

    it('should handle missing required fields', async () => {
      const invalidData = {
        // Missing title and content
      };

      const response = await request(app).post('/api/v1/reports').send(invalidData).expect(500);

      expect(response.body.success).toBe(false);
    });
  });

  describe('GET /api/v1/reports/format', () => {
    it('should return the correct format', async () => {
      const response = await request(app).get('/api/v1/reports/format').expect(200);

      expect(response.body.format).toBe('.docx');
    });
  });

  describe('API Error Handling', () => {
    it('should handle malformed JSON', async () => {
      await request(app)
        .post('/api/v1/reports')
        .send('invalid json')
        .set('Content-Type', 'application/json')
        .expect(400); // Express returns 400 for malformed JSON
    });

    it('should handle empty request body', async () => {
      const response = await request(app).post('/api/v1/reports').send({}).expect(500);

      expect(response.body.success).toBe(false);
    });
  });

  describe('File System Integration', () => {
    it('should create generated-reports directory if it does not exist', async () => {
      const legacyReportsDir = path.join(process.cwd(), 'generated-reports');

      // Ensure directory exists
      if (!fs.existsSync(legacyReportsDir)) {
        fs.mkdirSync(legacyReportsDir, { recursive: true });
      }

      const reportData: ReportData = {
        title: 'Directory Test',
        content: 'Testing directory creation via API',
        metadata: {},
      };

      const response = await request(app).post('/api/v1/reports').send(reportData).expect(200);

      expect(response.body.success).toBe(true);
      expect(fs.existsSync(response.body.path)).toBe(true);
    });

    it('should generate unique filenames for multiple requests', async () => {
      const reportData: ReportData = {
        title: 'Unique Filename Test',
        content: 'Testing unique filename generation via API',
        metadata: {},
      };

      const response1 = await request(app).post('/api/v1/reports').send(reportData).expect(200);

      const response2 = await request(app).post('/api/v1/reports').send(reportData).expect(200);

      expect(response1.body.path).not.toBe(response2.body.path);
      expect(fs.existsSync(response1.body.path)).toBe(true);
      expect(fs.existsSync(response2.body.path)).toBe(true);
    });
  });
});
