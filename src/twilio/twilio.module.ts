import { Module } from '@nestjs/common';
import { TwilioService } from './twilio.service';
import { PrismaService } from 'src/prisma.service';
import { TwilioDataService } from './twilio.data.service';


@Module({
  providers: [TwilioService, PrismaService, TwilioDataService,],
  exports: [TwilioService,TwilioDataService],
   
})
export class TwilioModule {}
