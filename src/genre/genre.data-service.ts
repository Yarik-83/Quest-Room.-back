import { Injectable } from '@nestjs/common';
import { Prisma } from '../../generated/prisma';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class GenreDataService {
  constructor(private prisma: PrismaService) {}

  create(data: Prisma.GenreCreateInput) {
    return this.prisma.genre.create({ data });
  }

  async findMany() {
    return await this.prisma.genre.findMany({
      include: { questGenres: { include: { quest: true } } },
    });
  }

  async findUnique(id: number) {
    const result = await this.prisma.genre.findUnique({
      where: {
        id: id, 
      },
      include: { questGenres: { include: { quest: true } } }
    });
    return result;
  }

  async update(id: number, body: Prisma.GenreUpdateInput) {
    
    return await this.prisma.genre.update({
      where: {
        id: id,
      },
      data: {
        name: body.name,
      },
    });
  }

  async delete(id: number) {
    const result = await this.prisma.genre.delete({
      where: {
        id: id,
      },
    });
    return result
  }

linkQuestToGenre(genreId: number, questId: number) {
  return this.prisma.questGenre.createMany({
    data: { questId, genreId },
    skipDuplicates: true,           
  });
}

unlinkQuestFromGenre( questId: number){
  return this.prisma.questGenre.deleteMany({
    where: {questId}
  })
}

}
