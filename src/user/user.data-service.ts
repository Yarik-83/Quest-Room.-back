import { Injectable } from '@nestjs/common';
import { Prisma } from '../../generated/prisma';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class UserDataService {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.UserCreateInput) {
    return await this.prisma.user.create({ data });
  }

  async findOne(where: { email: string }) {
    const result = await this.prisma.user.findUnique({
      where: {
        email: where.email,
      },
    });
    return result;
  }

  async getUserById(id: number) {
    const result = await this.prisma.user.findUnique({
      where: { id: id },
    });
    return result;
  }
}
