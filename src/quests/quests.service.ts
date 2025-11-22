import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { Prisma } from 'generated/prisma';
import { QuestDataService } from './quest.data-service';
import { IBlobFile, IQuest } from 'src/interface';
import { StorageService } from 'src/storage/storage.service';
import { GenreService } from 'src/genre/genre.service';

@Injectable()
export class QuestService {
  private readonly logger = new Logger(StorageService.name);
  constructor(
    private quest: QuestDataService,
    private storage: StorageService,
    private genreService: GenreService,
  ) {}

  async create(data: IQuest, file: IBlobFile) {
    try {
      const pictureUrl = await this.storage.createBlobFile(file);
      if (pictureUrl) {
        const { genre, ...rest } = data;
        const questToSave = { ...rest, picture: pictureUrl };

        const newQuest = await this.quest.create(questToSave);

        const allGenres = await this.genreService.findAll();

        const findedGenre = allGenres.find(
          (g) => g.name.toLocaleLowerCase() === genre.toLocaleLowerCase(),
        );

        if (!findedGenre) {
          const genreToSave = { name: genre };
          const newGenre = await this.genreService.create(genreToSave);
          await this.genreService.linkQuestToGenre(newGenre.id, newQuest.id);
        } else {
          await this.genreService.linkQuestToGenre(findedGenre.id, newQuest.id);
        }
        return newQuest;
      }
      throw new Error("Azure service doesn't work");
    } catch (error) {
      if (error instanceof Error) {
        this.logger.error(error.message);
        throw new InternalServerErrorException();
      }
    }
  }

  async findAll() {
    const result = await this.quest.findAllQuests();
    return result.map((el) => ({
      id: el.id,
      title: el.title,
      description: el.description,
      level: el.level,
      people: el.people,
      time: el.time,
      picture: el.picture,
      minPlayers: el.minPlayers,
      maxPlayers: el.maxPlayers,
      genre: el.questGenres.map((g) => g.genre.name),
    }));
  }

  async readQuestById(id: number) {
    const result = await this.quest.readQuestById(id);
    if (!result) {
      throw new ConflictException('Object with this ID not found');
    }
    const { questGenres, ...restUser } = result;
    const questWithGenre = {
      ...restUser,
      genre: result.questGenres.map((g) => g.genre.name),
    };
    return questWithGenre;
  }

  async update(id: number, body: Prisma.QuestUpdateInput) {
    try {
      const quest = await this.quest.updateQuest(id, body);
      return quest;
    } catch (error) {
      if (error && error.code === 'P2025') {
        throw new NotFoundException('Object with this ID not found');
      }
      throw error;
    }
  }

  async delete(id: number) {
    try {
      await this.quest.deleteQuest(id);
      return { message: 'Object with this ID deleted' };
    } catch (error) {
      if (error && error.code === 'P2025') {
        return { message: 'Object with this ID not found' };
      }
      throw error;
    }
  }
}
