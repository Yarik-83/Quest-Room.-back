import {
  Injectable,
  NotFoundException,
  Logger,
  BadRequestException,
} from '@nestjs/common';
import { IGenreCreate, IGenreQuery } from './interface';
import { GenreDataService } from './genre.data-service';

@Injectable()
export class GenreService {
  private readonly logger = new Logger('GenreService');
  constructor(private readonly genre: GenreDataService) {}

  async create(data: IGenreCreate) {
    const allGenres = await this.findAll();
    const exsistGenre = allGenres.find(
      (genre) => genre.name.toLocaleLowerCase() === data.name.toLowerCase(),
    );
    if (!exsistGenre) {
      return await this.genre.create(data);
    }
    return exsistGenre;
  }

  async findAll() {
    return await this.genre.findMany();
  }

  async findOne(id: number) {
    const result = await this.genre.findUnique(id);
    return result;
  }

  async update(id: number, body: IGenreQuery) {
    const genre = await this.findOne(id);
    if (!genre) {
      this.logger.error('Object with this ID not found');
      throw new NotFoundException();
    }
    return await this.genre.update(id, body);
  }

  async deleteGenre(id: number) {
    const genre = await this.findOne(id);
    if (!genre) {
      this.logger.error('Object with this ID not found');
      throw new NotFoundException();
    }
    return await this.genre.delete(id);
  }

  async linkQuestToGenre(genreId: number, questId: number) {
    try {
      return await this.genre.linkQuestToGenre(genreId, questId);
    } catch (err) {
      if (err.code === 'P2025') {
        this.logger.error('Quest or Genre not found');
        throw new NotFoundException();
      }
      if (err.code === 'P2002') {
        this.logger.error('This relation already exsis!');
        throw new BadRequestException();
      }
      throw err;
    }
  }

  async unlinkQuestFromGenre(questId: number) {
    return await this.genre.unlinkQuestFromGenre(questId);
  }

  async cleaningEmptyGenre(genreId: number) {
    const delQuestGenre = await this.findOne(genreId);

    if (!delQuestGenre?.questGenres.length) {
      await this.deleteGenre(genreId);
    }
  }
}
