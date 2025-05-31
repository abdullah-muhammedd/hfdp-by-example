import { Hookable } from '../types/interfaces/hookable.interface';
import { User } from '../types/interfaces/user.interface';

export abstract class UserFactory {
  abstract createUser(
    id: string,
    name: string,
    email: string,
    phone: string,
    address: string,
  ): User & Hookable;
}
