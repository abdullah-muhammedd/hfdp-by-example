import { UserFactory } from './factory/user.factory';
import { User } from './types/interfaces/user.interface';
import { UserRepoInterface } from './types/interfaces/user.repo.interface';

export class UserService {
  constructor(
    private userFactory: UserFactory,
    private userRepository: UserRepoInterface,
  ) {}

  async createUser(
    id: string,
    name: string,
    email: string,
    phone: string,
    address: string,
  ): Promise<User> {
    const user = this.userFactory.createUser(id, name, email, phone, address);
    await this.userRepository.save(user);
    return user;
  }

  async getUser(id: string): Promise<User | null> {
    return this.userRepository.findById(id);
  }

  async getAllUsers(): Promise<User[]> {
    return this.userRepository.findAll();
  }

  async updateUser(id: string, userData: Partial<User>): Promise<void> {
    await this.userRepository.update(id, userData);
  }

  async deleteUser(id: string): Promise<void> {
    await this.userRepository.delete(id);
  }
}
