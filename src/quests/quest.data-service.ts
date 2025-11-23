import { Injectable } from '@nestjs/common';
import { Prisma } from 'generated/prisma';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class QuestDataService {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.QuestCreateInput) {
    return await this.prisma.quest.create({ data });
  }

  async findAllQuests() {
    const result = await this.prisma.quest.findMany({
      include: {
        questGenres: {
          include: {
            genre: true,
          },
        },
      },
    });
    return result;
  }

  async readQuestById(id: number) {
    const result = await this.prisma.quest.findUnique({
      where: { id: id },
      include: {
        questGenres: {
          include: {
            genre: true,
          },
        },
      },
    });
    return result;
  }

  async updateQuest(id: number, body: Prisma.QuestUpdateInput) {
    return await this.prisma.quest.update({
      where: { id: id },
      data: body,
    });
  }

  async deleteQuest(id: number) {
    return await this.prisma.quest.delete({
      where: { id: id },
      include: {questGenres: true}
    });
  }
}


