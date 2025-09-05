import { IsBoolean, IsEmail, IsMobilePhone, IsOptional, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsOptional()
  name: string;
  @IsString()
  @IsEmail()
  @IsOptional()
  email: string;
  @IsOptional()
  @IsString()
  @MinLength(5)
  password: string;
  @IsOptional()
  @IsString()
  @IsMobilePhone('uk-UA')
  phone: string;
}
