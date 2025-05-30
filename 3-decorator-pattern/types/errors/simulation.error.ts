export class SimulationError extends Error {
  constructor(failureRate: number) {
    super(`Simulated failure (${failureRate}% chance)`);
    this.name = 'SimulationError';
  }
}
