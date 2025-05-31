import { User } from './user.interface';

export interface UserRepoInterface {
  save(user: User): Promise<void>;
  findById(id: string): Promise<User | null>;
  findAll(): Promise<User[]>;
  update(id: string, user: Partial<User>): Promise<void>;
  delete(id: string): Promise<void>;
}
