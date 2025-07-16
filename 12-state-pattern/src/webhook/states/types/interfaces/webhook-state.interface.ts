import { WebhookContext } from '../../../webhook.context';

export interface WebhookState {
  handle(context: WebhookContext): Promise<void>;
  getName(): string;
}
