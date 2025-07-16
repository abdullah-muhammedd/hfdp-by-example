import { VerifyingState } from './verifying.state';
import { WebhookState } from './types/interfaces/webhook-state.interface';
import { WebhookContext } from './../webhook.context';

export class IdleState implements WebhookState {
  getName(): string {
    return this.constructor.name;
  }

  async handle(context: WebhookContext): Promise<void> {
    console.log('[Idle] Starting webhook processing...');

    const input = context.getInput();
    if (!input.headers || !input.body) {
      throw new Error('[Idle] Missing headers or body');
    }

    context.transitionTo(new VerifyingState());
    await context.handle();
  }
}
