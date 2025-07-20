import { IsInt } from "class-validator";


export class LinkQuestToGenreDto {
  @IsInt() genreId: number;
  @IsInt() questId: number;
}