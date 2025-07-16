import request from 'supertest';
import express from 'express';
import bodyParser from 'body-parser';
import { WebhookController } from './../src/webhook/webhook.controller';
import { WebhookService } from './../src/webhook/webhook.service';

describe('WebhookController (e2e)', () => {
  let app: express.Express;

  beforeAll(() => {
    app = express();
    app.use(bodyParser.json());

    const controller = new WebhookController(new WebhookService());

    app.post('/webhook', (req, res) => controller.handle(req, res));
  });

  it('should process a valid webhook successfully', async () => {
    const response = await request(app)
      .post('/webhook')
      .set('x-signature', 'abc123') // valid signature
      .send({
        event: 'payment_received',
        data: { amount: 100 },
      });

    expect(response.status).toBe(200);
    expect(response.text).toContain('✅');
  });

  it('should fail with invalid signature', async () => {
    const response = await request(app)
      .post('/webhook')
      .set('x-signature', 'wrong-signature')
      .send({
        event: 'payment_received',
        data: { amount: 100 },
      });

    expect(response.status).toBe(400);
    expect(response.text).toContain('Invalid signature');
  });

  it('should fail when missing event or data', async () => {
    const response = await request(app)
      .post('/webhook')
      .set('x-signature', 'abc123') // valid
      .send({}); // invalid body

    expect(response.status).toBe(400);
    expect(response.text).toContain('Missing event or data'); // Ofcourse you should not always test strings because they are a big area of change
  });
});
