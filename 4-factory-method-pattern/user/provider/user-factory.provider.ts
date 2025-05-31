import { UserFactory } from '../factory/user.factory';
import { UserType } from '../types/enums/user-type.enum';
import { AdminUserFactory } from '../factory/admin-user.factory';
import { OwnerUserFactory } from '../factory/owner-user.factory';
import { ViewerUserFactory } from '../factory/viewer-user.factory';

// hint: SingleTone Pattern But why ?
export class UserFactoryProvider {
  private static instance: UserFactoryProvider;

  // Injecting available factories in the constructor with a map to more testable and flexible code, still providing default value that can be stored elsewhere in a constant
  private constructor(
    private factories = new Map([
      [UserType.ADMIN, new AdminUserFactory()],
      [UserType.OWNER, new OwnerUserFactory()],
      [UserType.VIEWER, new ViewerUserFactory()],
    ]),
  ) {}

  static getInstance(): UserFactoryProvider {
    if (!UserFactoryProvider.instance) {
      UserFactoryProvider.instance = new UserFactoryProvider();
    }
    return UserFactoryProvider.instance;
  }

  getFactory(type: UserType): UserFactory {
    const factory = this.factories.get(type);
    if (!factory) {
      throw new Error(`Unsupported user type: ${type}`);
    }
    return factory;
  }
}
