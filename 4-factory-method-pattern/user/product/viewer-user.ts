import { Permissions } from '../types/enums/permissions.enum';
import { Hookable } from '../types/interfaces/hookable.interface';
import { User } from '../types/interfaces/user.interface';

export class ViewerUser implements User, Hookable {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  permissions: Permissions[] = [];

  constructor(id: string, name: string, email: string, phone: string, address: string) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.phone = phone;
    this.address = address;
  }
  preSave() {
    // Only read permissions
    this.permissions.push(Permissions.READ_USER);
    this.permissions.push(Permissions.READ_PROJECT);
    this.permissions.push(Permissions.READ_PROJECT_TASK);
    this.permissions.push(Permissions.READ_PROJECT_TASK_COMMENT);
  }
}
