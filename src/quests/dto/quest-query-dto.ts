import { IsOptional, IsString } from "class-validator";


export class QuestQueryDto{
  @IsOptional()
  @IsString()
  title: string;
  @IsOptional()
  @IsString()
  description: string;
}