import { Injectable } from '@nestjs/common';
import { User } from '../entities/user.entity';
@Injectable()
export class UserRepository {
  private users: Map<string, User> = new Map();
  private apiKeyIndex: Map<string, string> = new Map();

  createUser(email: string, isPro = false): User {
    const user = new User(email, isPro);
    this.users.set(user.id, user);
    this.apiKeyIndex.set(user.apiKey, user.id);
    return user;
  }

  findById(userId: string): User | undefined {
    return this.users.get(userId);
  }

  findByApiKey(apiKey: string): User | undefined {
    const userId = this.apiKeyIndex.get(apiKey);
    return userId ? this.users.get(userId) : undefined;
  }

  canMakeRequest(apiKey: string): boolean {
    const user = this.findByApiKey(apiKey);
    return user ? user.canMakeRequest() : false;
  }

  recordRequest(apiKey: string): void {
    const user = this.findByApiKey(apiKey);
    if (user) user.incrementRequests();
  }
}
