import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserRepository } from './repo/user.repo';
import { UserServiceProxy } from './proxy/user-service.proxy';
import { ApiKeyGuard } from './guard/api-key.guard';

@Module({
  controllers: [UserController],
  providers: [UserService, UserRepository, UserServiceProxy, ApiKeyGuard],
  exports: [ApiKeyGuard, UserServiceProxy],
})
export class UserModule {}
