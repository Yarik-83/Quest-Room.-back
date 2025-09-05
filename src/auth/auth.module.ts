import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PrismaService } from 'src/prisma.service';
import { UserModule } from 'src/user/user.module';
import { TwilioModule } from 'src/twilio/twilio.module';
import { TwilioDataService } from 'src/twilio/twilio.data.service';
import { TwilioService } from 'src/twilio/twilio.service';


@Module({
  imports: [UserModule,TwilioModule],
  controllers: [AuthController],
  providers: [AuthService,PrismaService,TwilioDataService, TwilioService],
  exports: [AuthService]
})
export class AuthModule {}
