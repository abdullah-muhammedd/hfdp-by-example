export class RateLimitError extends Error {
  constructor(waitTimeSeconds: number) {
    super(`Rate limit exceeded. Please wait ${waitTimeSeconds} seconds.`);
    this.name = 'RateLimitError';
  }
}
