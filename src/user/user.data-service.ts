import { Injectable } from '@nestjs/common';
import { Prisma } from 'generated/prisma';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class UserDataService {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.UserCreateInput) {
    return await this.prisma.user.create({ data });
  }

  async findAll() {
    const result = await this.prisma.user.findMany();
    return result;
  }

  async findOne(where: {
    id:number
    email:string
  }) {
    const result = await this.prisma.user.findUnique({
      where: where,
    });
    return result;
  }

  async updateUser(id: number, body: Prisma.UserUpdateInput) {
    return await this.prisma.user.update({
      where: { id: id },
      data: body,
    });
  }

  async deleteUser(id: number) {
    return await this.prisma.user.delete({
      where: { id: id },
    });
  }
}
