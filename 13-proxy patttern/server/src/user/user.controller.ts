import {
  Controller,
  Post,
  Get,
  Body,
  UseGuards,
  Req,
  UnauthorizedException,
} from '@nestjs/common';
import { ValidateApiKeyDto } from './dto/validate-api-key.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { ApiKeyGuard } from './guard/api-key.guard';
import { UserServiceProxy } from './proxy/user-service.proxy';

@Controller('user')
export class UserController {
  constructor(private readonly userServiceProxy: UserServiceProxy) {}

  @Post('create')
  createUser(@Body() dto: CreateUserDto) {
    return this.userServiceProxy.createUser(dto);
  }

  @Post('validate')
  validateApiKey(@Body() dto: ValidateApiKeyDto) {
    const user = this.userServiceProxy.validateApiKey(dto);
    if (!user) throw new UnauthorizedException('Invalid API key');
    return { valid: true, user };
  }

  @Get('me')
  @UseGuards(ApiKeyGuard)
  getMe(@Req() req: any) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-member-access
    return req.user; // populated by the guard
  }
}
