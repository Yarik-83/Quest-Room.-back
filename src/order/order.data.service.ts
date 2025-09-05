import { Injectable } from '@nestjs/common';
import { Prisma } from 'generated/prisma';
import { PrismaService } from 'src/prisma.service';


@Injectable()
export class OrderDataService {
  constructor(private prisma: PrismaService) {}

   async create(data: Prisma.OrderCreateInput) {
   return await this.prisma.order.create({data});
  }

  async getUserQuests(id: number) {
    return await this.prisma.order.findMany({
      where: {
        clientId:id
      },
      include: {
        quest:true
      }
    });
  }
}