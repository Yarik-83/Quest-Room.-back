import { Module } from '@nestjs/common';
import { QuestModule } from './quests/quest.module';
import { GenreModule } from './genre/genre.module';
import { UserModule } from './user/user.module';


@Module({
  imports: [QuestModule, GenreModule, UserModule],
  providers: [],
})
export class AppModule {}
