import { IsEmail, IsOptional, IsBoolean } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsOptional()
  @IsBoolean()
  isPro?: boolean;
}
