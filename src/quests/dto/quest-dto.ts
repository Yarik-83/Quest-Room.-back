

import { IsString,  } from 'class-validator';

export class CreateQuestDto {
  @IsString() title: string;
  @IsString() description: string;
  @IsString() level: string;
  @IsString() people: string;
  @IsString() time: string;
  @IsString() picture: string;
}

