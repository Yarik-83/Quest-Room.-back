import { Module } from '@nestjs/common';
import { QuestModule } from './quests/quest.module';
import { GenreModule } from './genre/genre.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './auth/auth-guard';
import { OrderModule } from './order/order.module';
import { TwilioModule } from './twilio/twilio.module';
import { StorageModule } from './storage/storage.module';


@Module({
  imports: [QuestModule, GenreModule, UserModule, AuthModule, OrderModule, TwilioModule,StorageModule],
  providers: [
      {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule {}
