import { WebhookContext } from '../webhook.context';
import { WebhookState } from './types/interfaces/webhook-state.interface';

export class ErrorState implements WebhookState {
  constructor(private reason: string) {}

  getName(): string {
    return this.constructor.name;
  }

  async handle(context: WebhookContext): Promise<void> {
    throw new Error(`[Error] Webhook failed: ${this.reason}`);
  }
}
