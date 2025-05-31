import { Permissions } from '../enums/permissions.enum';

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  permissions: Permissions[];
}
