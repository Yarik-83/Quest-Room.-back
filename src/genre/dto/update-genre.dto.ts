import { Type } from 'class-transformer';
import { IsInt, IsOptional, IsString } from 'class-validator';

export class UpdateGenreDto {
  @IsOptional()
  @IsString()
  name: string;


}
