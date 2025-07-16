import { WebhookInput } from './states/types/webhook-input.type';
import { WebhookContext } from './webhook.context';

export class WebhookService {
  async process(input: WebhookInput): Promise<void> {
    const context = new WebhookContext();
    context.setInput(input);
    await context.handle();
  }
}
