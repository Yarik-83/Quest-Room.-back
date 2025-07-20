import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserDataService } from './user.data-service';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [UserController,],
  providers: [UserService,UserDataService,PrismaService],
})
export class UserModule {}
