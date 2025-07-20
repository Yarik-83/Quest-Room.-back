import { Type } from 'class-transformer';
import { IsArray, isArray, IsInt, IsString } from 'class-validator';
import { Quest } from 'generated/prisma';
import { CreateQuestDto } from 'src/quests/dto/quest-dto';


export class CreateGenreDto {
  @IsString() name: string;
}

