import { Module } from '@nestjs/common';
import { GenreService } from './genre.service';
import { GenreController } from './genre.controller';
import { PrismaService } from 'src/prisma.service';
import { GenreDataService } from './genre.data-service';

@Module({
  controllers: [GenreController],
  providers: [GenreService,PrismaService,GenreDataService],
  exports: [GenreService,]
})
export class GenreModule {}
