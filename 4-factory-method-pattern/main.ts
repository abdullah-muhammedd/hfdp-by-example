import { UserService } from './user/user.service';
import { UserType } from './user/types/enums/user-type.enum';
import { UserRepository } from './user/repo/user.repo';
import { UserFactoryProvider } from './user/provider/user-factory.provider';

async function createAndManageUser(userType: UserType) {
  console.log(`\n📝 Testing ${userType} user creation and management...`);

  try {
    const repository = new UserRepository();
    const factory = UserFactoryProvider.getInstance().getFactory(userType);
    const userService = new UserService(factory, repository);

    // Create user
    console.log(`\n🔨 Creating ${userType} user...`);
    const newUser = await userService.createUser(
      Date.now().toString(),
      `John Doe (${userType})`,
      `john.${userType.toLowerCase()}@example.com`,
      '1234567890',
      '123 Main St',
    );
    console.log('✅ Created user:', newUser);

    // Find user
    console.log(`\n🔍 Finding ${userType} user...`);
    const user = await userService.getUser(newUser.id);
    console.log('✅ Found user:', user);

    // Update user
    console.log(`\n📝 Updating ${userType} user...`);
    await userService.updateUser(newUser.id, {
      phone: '0987654321',
      address: '456 Updated St',
    });
    console.log('✅ User updated successfully');

    // Get all users
    console.log(`\n📋 Listing all users...`);
    const allUsers = await userService.getAllUsers();
    console.log('✅ Users in system:', allUsers);

    // Delete user
    console.log(`\n🗑️ Deleting ${userType} user...`);
    await userService.deleteUser(newUser.id);
    console.log('✅ User deleted successfully');
  } catch (error) {
    console.error(`❌ Error while managing ${userType} user:`, (error as Error).message);
    throw error; // Re-throw to handle in main sequence
  }
}

async function main() {
  console.log('🚀 Starting user management demo...\n');

  const userTypes = [UserType.ADMIN, UserType.OWNER, UserType.VIEWER];

  for (const userType of userTypes) {
    try {
      await createAndManageUser(userType);
      console.log(`\n✨ Successfully completed ${userType} user flow`);
    } catch (error) {
      console.error(`\n💥 Failed ${userType} user flow:`, (error as Error).message);
    }
    console.log('\n' + '='.repeat(50));
  }

  // Test invalid user type
  try {
    console.log('\n⚠️ Testing invalid user type...');
    await createAndManageUser('INVALID' as UserType);
  } catch (error) {
    console.error('❌ Expected error with invalid user type:', (error as Error).message);
  }

  console.log('\n🏁 Demo completed!');
}

// Run the demo
main().catch((error) => {
  console.error('\n💥 Fatal error:', error);
  process.exit(1);
});
