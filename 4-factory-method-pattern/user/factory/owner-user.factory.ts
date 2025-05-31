import { OwnerUser } from '../product/owner-user';
import { Hookable } from '../types/interfaces/hookable.interface';
import { User } from '../types/interfaces/user.interface';
import { UserFactory } from './user.factory';

export class OwnerUserFactory extends UserFactory {
  createUser(
    id: string,
    name: string,
    email: string,
    phone: string,
    address: string,
  ): User & Hookable {
    const user = new OwnerUser(id, name, email, phone, address);
    user.preSave();
    return user;
  }
}
