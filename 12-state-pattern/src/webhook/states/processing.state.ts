import { CompletedState } from './completed.state';
import { ErrorState } from './error.state';
import { WebhookState } from './types/interfaces/webhook-state.interface';
import { WebhookContext } from './../webhook.context';
import { setTimeout } from 'timers/promises';

export class ProcessingState implements WebhookState {
  getName(): string {
    return this.constructor.name;
  }

  async handle(context: WebhookContext): Promise<void> {
    const input = context.getInput();
    const { event, data } = input.body || {};

    console.log(`[Processing] Handling event: ${event}`);

    try {
      // Simulate business logic
      if (!event || !data) throw new Error('Missing event or data');

      // Fake processing delay
      await setTimeout(200);
      console.log('[Processing] Successfully processed ✅');
      context.transitionTo(new CompletedState());
    } catch (err: any) {
      console.error('[Processing] Failed:', err.message);
      context.transitionTo(new ErrorState(err.message));
    }

    await context.handle();
  }
}
