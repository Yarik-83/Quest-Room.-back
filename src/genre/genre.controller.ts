import { Controller, Post, Get, Body, Delete, Param, Patch } from '@nestjs/common';
import { GenreService } from './genre.service';
import { CreateGenreDto } from './dto/create-genre.dto';
import { LinkQuestToGenreDto } from './dto/link-quest-genre.dto';
import { UpdateGenreDto } from './dto/update-genre.dto';

@Controller('genres')
export class GenreController {
  constructor(private readonly genreService: GenreService) {}

  @Post()
  create(@Body() dto: CreateGenreDto) {
    return this.genreService.create(dto);
  }

  @Post('link-quest')
  linkQuest(@Body() dto: LinkQuestToGenreDto) {
    return this.genreService.linkQuestToGenre(dto.genreId, dto.questId);
  }

  @Get()
  findAll() {
    return this.genreService.findAll();
  }

    @Get(':id')
  findOne(@Param('id') id: string) {
    return this.genreService.findOne(+id);
  }

    @Patch(':id')
  update(@Param('id') id: string, @Body() data: UpdateGenreDto) {
    return this.genreService.update(+id, data);
  }

    @Delete(':id')
  delete(@Param('id') id: string) {
    return this.genreService.deleteGenre(+id);
  }
}


