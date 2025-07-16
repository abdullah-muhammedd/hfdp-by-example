import { ProcessingState } from './processing.state';
import { ErrorState } from './error.state';
import { WebhookContext } from './../webhook.context';
import { WebhookState } from './types/interfaces/webhook-state.interface';

export class VerifyingState implements WebhookState {
  getName(): string {
    return this.constructor.name;
  }

  async handle(context: WebhookContext): Promise<void> {
    const input = context.getInput();
    const signature = input.headers['x-signature'];
    console.log(signature);
    console.log('[Verifying] Checking signature...');

    // Fake validation for demonstration
    const valid = signature === 'abc123';

    if (valid) {
      console.log('[Verifying] Signature valid ✅');
      context.transitionTo(new ProcessingState());
    } else {
      console.warn('[Verifying] Signature invalid ❌');
      context.transitionTo(new ErrorState('Invalid signature'));
    }

    await context.handle();
  }
}
