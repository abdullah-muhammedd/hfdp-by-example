/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UserServiceProxy } from '../proxy/user-service.proxy';

@Injectable()
export class ApiKeyGuard implements CanActivate {
  constructor(private readonly userServiceProxy: UserServiceProxy) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const apiKey = request.headers['x-api-key'] as string;

    if (!apiKey) {
      throw new UnauthorizedException('API key missing');
    }

    try {
      // Validate and record the request (enforces quota for free users)
      const user = this.userServiceProxy.validateApiKey({ apiKey });
      if (!user.isPro) {
        if (!this.userServiceProxy.canMakeRequest(apiKey)) {
          throw new UnauthorizedException('Daily quota exceeded');
        }
        this.userServiceProxy.recordRequest(apiKey);
      }

      request.user = user;

      return true;
    } catch {
      throw new UnauthorizedException('Invalid API key or quota exceeded');
    }
  }
}
