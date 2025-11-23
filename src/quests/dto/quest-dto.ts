import { IsNumber, IsString } from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateQuestDto {
  @IsString() title: string;
  @IsString() description: string;
  @IsString() level: string;
  @IsString() people: string;
  @IsString() time: string;
  @IsString() genre: string;
  @Transform(({ value }) => Number(value))
  @IsNumber()
  minPlayers: number;
  @Transform(({ value }) => Number(value))
  @IsNumber()
  maxPlayers: number;
}
