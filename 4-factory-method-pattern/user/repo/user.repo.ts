import { User } from '../types/interfaces/user.interface';
import { UserRepoInterface } from '../types/interfaces/user.repo.interface';

export class UserRepository implements UserRepoInterface {
  // Simulated in-memory storage
  private users: Map<string, User> = new Map();

  async save(user: User): Promise<void> {
    await this.simulateDelay();
    this.users.set(user.id, { ...user });
    console.log(`[UserRepository] User saved: ${user.name}`);
  }

  async findById(id: string): Promise<User | null> {
    await this.simulateDelay();
    const user = this.users.get(id);
    return user || null;
  }

  async findAll(): Promise<User[]> {
    await this.simulateDelay();
    return Array.from(this.users.values());
  }

  async update(id: string, userData: Partial<User>): Promise<void> {
    await this.simulateDelay();

    const existingUser = this.users.get(id);
    if (!existingUser) {
      throw new Error(`User not found: ${id}`);
    }

    const updatedUser = { ...existingUser, ...userData };
    this.users.set(id, updatedUser);
    console.log(`[UserRepository] User updated: ${updatedUser.id}`);
  }

  async delete(id: string): Promise<void> {
    await this.simulateDelay();

    if (!this.users.has(id)) {
      throw new Error(`User not found: ${id}`);
    }

    this.users.delete(id);
    console.log(`[UserRepository] User deleted: ${id}`);
  }

  private async simulateDelay(): Promise<void> {
    const delay = Math.random() * 200 + 100;
    await new Promise((resolve) => setTimeout(resolve, delay));
  }
}
