export class CommandInvokerService {
  private history: Command[] = [];

  execute(command: Command) {
    command.execute();
    this.history.push(command);
  }

  undoLast(): void {
    const cmd = this.history.pop();
    cmd?.undo?.();
  }

  clear(): void {
    this.history = [];
  }

  getHistory(): Command[] {
    return [...this.history];
  }
}
