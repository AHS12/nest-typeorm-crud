import { IsBoolean, IsEmail, IsOptional, IsString } from 'class-validator';

export class UserUpdateDto {
  id: number;

  @IsOptional()
  @IsString()
  firstName?: string;

  @IsOptional()
  @IsString()
  lastName?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
