import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { QuestDataService } from './quest.data-service';
import { IQuest } from 'src/interface';
import { StorageService } from 'src/storage/storage.service';
import { GenreService } from 'src/genre/genre.service';
import { IBlobFile } from 'src/storage/interface';

@Injectable()
export class QuestService {
  private readonly logger = new Logger(QuestService.name);
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

        const genreToSave = { name: genre };
        const updatedGenre = await this.genreService.create(genreToSave);

        await this.genreService.linkQuestToGenre(updatedGenre.id, newQuest.id);

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

  async update(id: number, body: IQuest, file?: IBlobFile) {
    try {
      const quest = await this.quest.readQuestById(id);
      if (!quest) throw new NotFoundException('Object with this ID not found');
      const oldUrl = quest.picture;
      const { genre, ...restQuest } = body;
      const oldQuestGenre = quest.questGenres[0]
      const oldGenreId = oldQuestGenre.id;
      const oldGenre = await this.genreService.findOne(oldGenreId);

      if (oldGenre?.name.toLocaleLowerCase() !== genre.toLocaleLowerCase()) {
        const updatedGenre = await this.genreService.create({ name: genre });

        await this.genreService.unlinkQuestFromGenre(
          oldQuestGenre.questId,
        );
        await this.genreService.linkQuestToGenre(updatedGenre.id, quest.id);
        await this.genreService.cleaningEmptyGenre(
          oldQuestGenre.genreId,
        );
      }

      if (file) {
        const newUrl = await this.storage.updateBlobFile(oldUrl, file);
        if (!newUrl) {
          this.logger.error("Azure service doesn't work");
          throw new InternalServerErrorException();
        }
        const questToSave = { ...restQuest, picture: newUrl };
        return await this.quest.updateQuest(quest.id, questToSave);
      }
      return await this.quest.updateQuest(quest.id, restQuest);
    } catch (error) {
      throw error;
    }
  }

  async delete(id: number) {
    try {
      const deletedQuest = await this.quest.deleteQuest(id);
      if (!deletedQuest) {
        this.logger.error('Object with this ID not found');
        throw new NotFoundException();
      }
      const deletedQuestGenreId = deletedQuest.questGenres[0].genreId;
      await this.genreService.cleaningEmptyGenre(deletedQuestGenreId);
      await this.storage.deleteBlobFile(deletedQuest.picture);
    } catch (error) {
      throw error;
    }
  }
}
