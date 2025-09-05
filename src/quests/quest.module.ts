
import {Module} from '@nestjs/common';
import { QuestService } from './quests.service';
import { QuestController } from "./quests.controller"
import { PrismaService } from 'src/prisma.service';
import { QuestDataService } from './quest.data-service';


@Module({
    controllers: [QuestController],
    providers: [QuestService, PrismaService,QuestDataService],
})
export class QuestModule {}

