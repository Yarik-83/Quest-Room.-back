
import { Injectable } from '@nestjs/common';
import { Prisma } from 'generated/prisma';
import { PrismaService } from 'src/prisma.service';


@Injectable()
export class TwilioDataService {
  constructor(private prisma: PrismaService) {}


  async findUser(phone: string){
    return await this.prisma.user.findUnique({ where: {phone}})
  }

   async createUser(data: Prisma.UserCreateInput) {
   return await this.prisma.user.create({data});
  }

  async upsertUser(phone: string){
    return await this.prisma.user.upsert({
      where:{phone}
      ,update: {}
      ,create:{phone}
    })

  }


  // async upsertUser(data: Prisma.UserCreateInput) {
  //   return await this.prisma.user.upsert({
  //       where: {
  //   phone: data.phone,
  // },
 
  // create: {
  //   phone: data.phone,
  //   smsCode: data.smsCode,
  // },
  //   })
  // }


  // async getUserQuests(id: number) {
  //   return await this.prisma.order.findMany({
  //     where: {
  //       clientId:id
  //     },
  //     include: {
  //       quest:true
  //     }
  //   });
  // }


}