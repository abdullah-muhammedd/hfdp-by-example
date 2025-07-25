export class User {
  id: string; // Unique identifier for the user
  email: string; // User's email
  apiKey: string; // Key used for authentication
  isPro: boolean; // Determines if the user is a pro subscriber
  requestCount: number; // Number of API requests made today
  lastRequestDate: Date; // Date of the last request (used to reset the counter)

  constructor(email: string, isPro = false) {
    this.id = crypto.randomUUID();
    this.email = email;
    this.apiKey = crypto.randomUUID(); // simple unique API key
    this.isPro = isPro;
    this.requestCount = 0;
    this.lastRequestDate = new Date();
  }

  incrementRequests(): void {
    const today = new Date().toDateString();
    if (this.lastRequestDate.toDateString() !== today) {
      // Reset counter for a new day
      this.requestCount = 0;
      this.lastRequestDate = new Date();
    }
    this.requestCount++;
  }

  canMakeRequest(): boolean {
    if (this.isPro) return true;
    const today = new Date().toDateString();
    if (this.lastRequestDate.toDateString() !== today) {
      // Reset counter for new day
      this.requestCount = 0;
      this.lastRequestDate = new Date();
    }
    return this.requestCount < 11; // free users limited to 10 requests per day
  }
}
