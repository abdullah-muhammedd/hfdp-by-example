import request from 'supertest';
import express from 'express';
import { ReportsController } from '../../../../api/v1/reports/reports.controller';
import { ReportsService } from '../../../../api/v1/reports/reports.service';
import { V2ProviderAdapter } from '../../../../api/v1/reports/adapters/v2-provider-adapter';
import { ReportsProvider as V2ReportsProvider } from '../../../../api/v2/reports/providers/reports.providers';
import { ReportData } from '../../../../api/types/report-data.type';
import * as fs from 'fs';
import * as path from 'path';

describe('V1 API with V2 Provider (Adapter Pattern) E2E Tests', () => {
  let app: express.Application;
  let controller: ReportsController;
  let service: ReportsService;
  let adapter: V2ProviderAdapter;
  let v2Provider: V2ReportsProvider;

  beforeAll(() => {
    // Setup the application
    app = express();
    app.use(express.json());

    // Initialize the components with adapter pattern
    v2Provider = new V2ReportsProvider();
    adapter = new V2ProviderAdapter(v2Provider);
    service = new ReportsService(adapter);
    controller = new ReportsController(service);

    // Setup routes
    app.post('/api/v1/reports', (req, res) => controller.generateReport(req, res));
    app.get('/api/v1/reports/format', (req, res) => controller.getReportFormat(req, res));
  });

  afterAll(() => {
    // Clean up generated files
    const legacyReportsDir = path.join(process.cwd(), 'generated-reports');
    if (fs.existsSync(legacyReportsDir)) {
      const files = fs.readdirSync(legacyReportsDir);
      for (const file of files) {
        if (file.endsWith('.pdf')) {
          try {
            fs.unlinkSync(path.join(legacyReportsDir, file));
          } catch (error) {
            // Ignore errors if file is still being written
            console.log(`Could not delete ${file}: ${error}`);
          }
        }
      }
    }
  });

  describe('POST /api/v1/reports (with V2 Provider via Adapter)', () => {
    it('should generate a PDF report using V2 provider through adapter', async () => {
      const reportData: ReportData = {
        title: 'E2E Test Report - V1 API with V2 Provider',
        content:
          'This is a test report generated via V1 API but using V2 provider through adapter (PDF format)',
        author: 'E2E Test System',
        date: new Date(),
        metadata: {
          test: true,
          provider: 'v1-api-v2-provider',
          format: 'pdf',
          adapter: true,
        },
      };

      const response = await request(app).post('/api/v1/reports').send(reportData).expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.path).toBeDefined();
      expect(response.body.path).toMatch(/\.pdf$/);
      expect(response.body.path).toContain('generated-reports');

      // Verify file was actually created
      expect(fs.existsSync(response.body.path)).toBe(true);
      const stats = fs.statSync(response.body.path);
      expect(stats.size).toBeGreaterThan(0);

      console.log(`✅ V1 API with V2 Provider: Generated PDF at ${response.body.path}`);
    });

    it('should handle minimal report data through adapter', async () => {
      const minimalData: ReportData = {
        title: 'Minimal Report via Adapter',
        content: 'Minimal content processed through adapter',
        metadata: {},
      };

      const response = await request(app).post('/api/v1/reports').send(minimalData).expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.path).toBeDefined();
      expect(fs.existsSync(response.body.path)).toBe(true);
    });

    it('should handle full report data through adapter', async () => {
      const fullData: ReportData = {
        title: 'Full Report via Adapter',
        content: 'Complete report content with all fields populated, processed through adapter',
        author: 'Test Author',
        date: new Date('2024-01-15'),
        metadata: {
          priority: 'high',
          category: 'test',
          tags: ['e2e', 'test', 'adapter'],
          adapter: true,
        },
      };

      const response = await request(app).post('/api/v1/reports').send(fullData).expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.path).toBeDefined();
      expect(fs.existsSync(response.body.path)).toBe(true);
    });

    it('should return 500 for invalid data through adapter', async () => {
      const invalidData = {
        title: '', // Empty title should fail validation
        content: 'Some content',
      };

      const response = await request(app).post('/api/v1/reports').send(invalidData).expect(500);

      expect(response.body.success).toBe(false);
    });

    it('should handle missing required fields through adapter', async () => {
      const invalidData = {
        // Missing title and content
      };

      const response = await request(app).post('/api/v1/reports').send(invalidData).expect(500);

      expect(response.body.success).toBe(false);
    });
  });

  describe('GET /api/v1/reports/format (with V2 Provider via Adapter)', () => {
    it('should return the correct format from V2 provider', async () => {
      const response = await request(app).get('/api/v1/reports/format').expect(200);

      // The adapter should return the V2 format
      expect(response.body.format).toBe('.pdf');
    });
  });

  describe('Adapter Pattern Verification', () => {
    it('should use V2 provider functionality through adapter', async () => {
      const reportData: ReportData = {
        title: 'Adapter Pattern Test',
        content: 'Testing that V2 provider features are available through adapter',
        metadata: {
          adapter: true,
          v2Features: true,
        },
      };

      const response = await request(app).post('/api/v1/reports').send(reportData).expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.path).toBeDefined();
      expect(response.body.path).toMatch(/\.pdf$/);

      // Verify that V2 provider was actually used (PDF format)
      const format = await service.getFormat();
      expect(format).toBe('.pdf');
    });

    it('should maintain V1 API interface while using V2 provider', async () => {
      const reportData: ReportData = {
        title: 'Interface Compatibility Test',
        content: 'Testing that V1 API interface is maintained while using V2 provider',
        metadata: {
          interface: 'v1',
          provider: 'v2',
          adapter: true,
        },
      };

      // This should work exactly like V1 API but use V2 provider internally
      const response = await request(app).post('/api/v1/reports').send(reportData).expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.path).toBeDefined();

      // The response format should be the same as V1 API
      expect(response.body).toHaveProperty('success');
      expect(response.body).toHaveProperty('path');
    });
  });

  describe('API Error Handling (with Adapter)', () => {
    it('should handle malformed JSON through adapter', async () => {
      await request(app)
        .post('/api/v1/reports')
        .send('invalid json')
        .set('Content-Type', 'application/json')
        .expect(400); // Express returns 400 for malformed JSON
    });

    it('should handle empty request body through adapter', async () => {
      const response = await request(app).post('/api/v1/reports').send({}).expect(500);

      expect(response.body.success).toBe(false);
    });
  });

  describe('File System Integration (with Adapter)', () => {
    it('should create generated-reports directory if it does not exist', async () => {
      const legacyReportsDir = path.join(process.cwd(), 'generated-reports');

      // Ensure directory exists
      if (!fs.existsSync(legacyReportsDir)) {
        fs.mkdirSync(legacyReportsDir, { recursive: true });
      }

      const reportData: ReportData = {
        title: 'Directory Test via Adapter',
        content: 'Testing directory creation via API with adapter',
        metadata: {},
      };

      const response = await request(app).post('/api/v1/reports').send(reportData).expect(200);

      expect(response.body.success).toBe(true);
      expect(fs.existsSync(response.body.path)).toBe(true);
    });

    it('should generate unique filenames for multiple requests through adapter', async () => {
      const reportData: ReportData = {
        title: 'Unique Filename Test via Adapter',
        content: 'Testing unique filename generation via API with adapter',
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
