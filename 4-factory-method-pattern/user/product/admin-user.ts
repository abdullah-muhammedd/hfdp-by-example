import { Permissions } from '../types/enums/permissions.enum';
import { Hookable } from '../types/interfaces/hookable.interface';
import { User } from '../types/interfaces/user.interface';

export class AdminUser implements User, Hookable {
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
    this.permissions.push(Permissions.READ_USER);
    this.permissions.push(Permissions.CREATE_USER);
    this.permissions.push(Permissions.UPDATE_USER);
    this.permissions.push(Permissions.READ_PROJECT);
    this.permissions.push(Permissions.CREATE_PROJECT);
    this.permissions.push(Permissions.UPDATE_PROJECT);
    this.permissions.push(Permissions.READ_PROJECT_TASK);
    this.permissions.push(Permissions.CREATE_PROJECT_TASK);
    this.permissions.push(Permissions.UPDATE_PROJECT_TASK);
    this.permissions.push(Permissions.ASSIGN_PROJECT_TASK);
    this.permissions.push(Permissions.UNASSIGN_PROJECT_TASK);
    this.permissions.push(Permissions.READ_PROJECT_TASK_COMMENT);
    this.permissions.push(Permissions.CREATE_PROJECT_TASK_COMMENT);
    this.permissions.push(Permissions.UPDATE_PROJECT_TASK_COMMENT);
  }
}
