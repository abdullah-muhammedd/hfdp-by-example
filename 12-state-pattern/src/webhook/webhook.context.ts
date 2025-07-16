import { IdleState } from './states/idle.state';
import { WebhookState } from './states/types/interfaces/webhook-state.interface';
import { WebhookInput } from './states/types/webhook-input.type';

export class WebhookContext {
  private state: WebhookState;
  private input!: WebhookInput;

  constructor() {
    this.state = new IdleState();
  }

  setInput(input: WebhookInput) {
    this.input = input;
  }

  getInput(): WebhookInput {
    return this.input;
  }

  transitionTo(state: WebhookState): void {
    console.log(`🔄 Transitioning to ${state.getName()}...`);
    this.state = state;
  }

  async handle(): Promise<void> {
    await this.state.handle(this);
  }
}
