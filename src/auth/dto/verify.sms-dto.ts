import { IsString } from 'class-validator';

export class VerifySmsDto implements VerifySmsDto{
  @IsString() phone: string;
  @IsString() code: string;
}
