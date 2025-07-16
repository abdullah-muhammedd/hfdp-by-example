import { WebhookState } from './types/interfaces/webhook-state.interface';
import { WebhookContext } from './../webhook.context';

export class CompletedState implements WebhookState {
  getName(): string {
    return this.constructor.name;
  }

  async handle(context: WebhookContext): Promise<void> {
    console.log('[Completed] Webhook successfully processed 🎉');
  }
}
