import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';
import path from 'path';

// V1
import { ReportsController as V1ReportsController } from './api/v1/reports/reports.controller';
import { ReportsService as V1ReportsService } from './api/v1/reports/reports.service';
import { ReportsProvider as V1ReportsProvider } from './api/v1/reports/providers/reports.providers';

// V2
import { ReportsController as V2ReportsController } from './api/v2/reports/reports.controller';
import { ReportsService as V2ReportsService } from './api/v2/reports/reports.service';
import { ReportsProvider as V2ReportsProvider } from './api/v2/reports/providers/reports.providers';

// Adapter
import { V2ProviderAdapter } from './api/v1/reports/adapters/v2-provider-adapter';

const app = express();
app.use(bodyParser.json());

// --- Swagger UI setup ---
const swaggerDocument = YAML.load(path.join(__dirname, 'swagger.yaml'));
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// --- V1 API with legacy provider ---
const v1Provider = new V1ReportsProvider();
const v1Service = new V1ReportsService(v1Provider);
const v1Controller = new V1ReportsController(v1Service);

app.post('/api/v1/reports', (req: Request, res: Response) => v1Controller.generateReport(req, res));
app.get('/api/v1/reports', (req: Request, res: Response) => v1Controller.getReportFormat(req, res));

// --- V2 API ---
const v2Provider = new V2ReportsProvider();
const v2Service = new V2ReportsService(v2Provider);
const v2Controller = new V2ReportsController(v2Service);

app.post('/api/v2/reports', (req: Request, res: Response) => v2Controller.generateReport(req, res));
app.get('/api/v2/reports', (req: Request, res: Response) => v2Controller.getReportFormat(req, res));

// --- V1 API with V2 provider via adapter (optional route) ---
const v2Adapter = new V2ProviderAdapter(new V2ReportsProvider());
const v1WithV2Service = new V1ReportsService(v2Adapter);
const v1WithV2Controller = new V1ReportsController(v1WithV2Service);

app.post('/api/v1-with-v2/reports', (req: Request, res: Response) =>
  v1WithV2Controller.generateReport(req, res),
);
app.get('/api/v1-with-v2/reports', (req: Request, res: Response) =>
  v1WithV2Controller.getReportFormat(req, res),
);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log('Swagger docs:        http://localhost:' + PORT + '/docs');
  console.log('V1 endpoint:         POST /api/v1/reports');
  console.log('V2 endpoint:         POST /api/v2/reports');
  console.log('V1-with-V2 endpoint: POST /api/v1-with-v2/reports');
});
