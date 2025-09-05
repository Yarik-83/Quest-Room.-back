import { Injectable, NotFoundException } from '@nestjs/common';
import { IGenreCreate, IGenreQuery } from './interface';
import { GenreDataService } from './genre.data-service';


@Injectable()
export class GenreService {
  constructor(private readonly genre: GenreDataService) {}

  create(data: IGenreCreate) {
    return this.genre.create(data);
  }

  async findAll() {
    return await this.genre.findMany();
  }

  async findOne(id: number) {
    const result = await this.genre.findUnique(id);
    return result;
  }

  async update(id: number, body: IGenreQuery) {
    try {
      const result = await this.genre.update(id, body);
      return result;
    } catch (error) {
      if (error.code === 'P2025')
        return { massage: 'Object with this ID not found' };
      throw new Error();
    }
  }

  async deleteGenre(id: number) {
    try {
      const result = await this.genre.delete(id);
      return result;
    } catch (err) {
      if (err.code === 'P2025')
        return { massage: 'Object with this ID not found' };
      throw new Error();
    }
  }

  async linkQuestToGenre(genreId: number, questId: number) {
  try {
    return await this.genre.linkQuestToGenre(genreId, questId);
  } catch (err) {
    if (err.code === 'P2025') {
      throw new NotFoundException('Quest або Genre не знайдено');
    }
    if (err.code === 'P2002') {
      return { message: 'Такий зв’язок уже існує' };   
    }
    throw err;
  }
}

}
