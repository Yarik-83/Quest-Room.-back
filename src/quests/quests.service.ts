import { Injectable } from '@nestjs/common';
import { Prisma } from 'generated/prisma';
import { QuestDataService } from './quest.data-service';
import { IQuest } from 'src/interface';

@Injectable()
export class QuestService {
  constructor(private quest: QuestDataService) {}

  create(data: IQuest) {
    return this.quest.create(data);
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
      genre: el.questGenres.map((g) => g.genre.name),
    }));
  }

  async readQuestById(id: number) {
    const result = await this.quest.readQuestById(id);
    return result
      ? {
          id: result.id,
          title: result.title,
          description: result.description,
          level: result.level,
          people: result.people,
          time: result.time,
          picture: result.picture,
          genre: result.questGenres.map((g) => g.genre.name),
        }
      : { massage: 'Object with this ID not found' };
  }

  async update(id: number, body: Prisma.QuestUpdateInput) {
    try {
      const quest = await this.quest.updateQuest(id, body);
      return quest;
    } catch (error) {
      if (error && error.code === 'P2025') {
        return { massage: 'Object with this ID not found' };
      }
      throw error;
    }
  }

  async delete(id: number) {
    try {
      await this.quest.deleteQuest(id);
      return { massage: 'Object with this ID deleted' };
    } catch (error) {
      if (error && error.code === 'P2025') {
        return { massage: 'Object with this ID not found' };
      }
      throw error;
    }
  }
}
