import { Injectable, ForbiddenException } from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { ValidateApiKeyDto } from '../dto/validate-api-key.dto';
import { User } from '../entities/user.entity';
import { UserService } from '../user.service';

@Injectable()
export class UserServiceProxy {
  constructor(private readonly realService: UserService) {}

  /**
   * Validates the API key and enforces request quota for free users.
   */
  private validateAndCheckQuota(apiKey: string): User {
    const user = this.realService.validateApiKey({
      apiKey,
    } as ValidateApiKeyDto);

    if (!user.isPro) {
      if (!this.realService.canMakeRequest(apiKey)) {
        throw new ForbiddenException(
          'Daily request limit reached for free users.',
        );
      }
      this.realService.recordRequest(apiKey);
    }

    return user;
  }

  /**
   * Create user: bypasses API key checks because it's for registration.
   */
  createUser(dto: CreateUserDto): User {
    return this.realService.createUser(dto);
  }

  /**
   * Validate an API key without consuming quota.
   */
  validateApiKey(dto: ValidateApiKeyDto): User {
    return this.realService.validateApiKey(dto);
  }

  /**
   * Check if the user can make a request (doesn't record it).
   */
  canMakeRequest(apiKey: string): boolean {
    // Validate first, but do not increment usage.
    this.realService.validateApiKey({ apiKey });
    return this.realService.canMakeRequest(apiKey);
  }

  /**
   * Record a request (increments usage) after validating and checking quota.
   */
  recordRequest(apiKey: string): void {
    this.validateAndCheckQuota(apiKey); // This already records for non-pro users
  }
}
