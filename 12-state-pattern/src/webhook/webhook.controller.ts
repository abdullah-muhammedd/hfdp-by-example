import { Request, Response } from 'express';
import { WebhookService } from './webhook.service';

export class WebhookController {
  constructor(private service: WebhookService = new WebhookService()) {}

  async handle(req: Request, res: Response): Promise<void> {
    try {
      await this.service.process({
        headers: req.headers,
        body: req.body,
      });
      res.status(200).send('✅ Webhook processed');
    } catch (err: any) {
      console.error('❌ Webhook error:', err.message);
      res.status(400).send(`❌ ${err.message}`);
    }
  }
}
