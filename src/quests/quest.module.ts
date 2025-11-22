import { Module } from '@nestjs/common';
import { QuestService } from './quests.service';
import { QuestController } from './quests.controller';
import { PrismaService } from 'src/prisma.service';
import { QuestDataService } from './quest.data-service';
import { StorageModule } from 'src/storage/storage.module';
import { StorageService } from 'src/storage/storage.service';
import { GenreModule } from 'src/genre/genre.module';
import { GenreService } from 'src/genre/genre.service';

@Module({
  controllers: [QuestController],
  providers: [QuestService, PrismaService, QuestDataService,],
  imports: [StorageModule, GenreModule],
})
export class QuestModule {}
