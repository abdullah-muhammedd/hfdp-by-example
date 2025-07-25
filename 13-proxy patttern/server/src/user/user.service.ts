import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { ValidateApiKeyDto } from './dto/validate-api-key.dto';
import { User } from './entities/user.entity';
import { UserRepository } from './repo/user.repo';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  createUser(dto: CreateUserDto): User {
    return this.userRepository.createUser(dto.email, dto.isPro ?? false);
  }

  validateApiKey(dto: ValidateApiKeyDto): User {
    const user = this.userRepository.findByApiKey(dto.apiKey);
    if (!user) throw new UnauthorizedException('Invalid API key');
    return user;
  }

  canMakeRequest(apiKey: string): boolean {
    return this.userRepository.canMakeRequest(apiKey);
  }

  recordRequest(apiKey: string): void {
    this.userRepository.recordRequest(apiKey);
  }
}
