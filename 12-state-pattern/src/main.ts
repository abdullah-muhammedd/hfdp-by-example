// src/server.ts
import express from 'express';
import { json } from 'body-parser';
import { WebhookController } from './webhook/webhook.controller';

const app = express();
app.use(json());

app.post('/webhook', new WebhookController().handle);

app.listen(3000, () => {
  console.log('🚀 Webhook processor running at http://localhost:3000');
});
