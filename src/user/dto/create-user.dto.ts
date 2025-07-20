import { IsBoolean, IsEmail, IsNotEmpty, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsString()
  name: string;
  @IsString()
  @IsEmail()
  email: string;
  @IsBoolean()
  @IsOptional()
  emailVarafied: boolean;
  @IsOptional()
  @IsString()
  @MinLength(5)
  password: string;
}
