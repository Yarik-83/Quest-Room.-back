import {
  Controller,
  Post,
  Get,
  Body,
  Delete,
  Param,
  Patch,
  SetMetadata,
} from '@nestjs/common';
import { QuestService } from './quests.service';
import { QuestQueryDto } from './dto/quest-query-dto';
import { CreateQuestDto } from './dto/quest-dto';
import { IS_PUBLIC_KEY } from 'src/decorators/public.decorator';


@SetMetadata(IS_PUBLIC_KEY, true)
@Controller('quests')
export class QuestController {
  constructor(private readonly questService: QuestService) {}

  @Post()
  create(@Body() dto: CreateQuestDto) {
    return this.questService.create(dto);
  }

  @Get()
  findAll() {
    return this.questService.findAll();
  }

  @Get(':id')
  async getQuestById(@Param('id') id: number) {
    const result = await this.questService.readQuestById(id);
    return result;
  }

  @Patch(':id')
  async updateQuest(@Param('id') id: number, @Body() body: QuestQueryDto) {
    const newQuest = this.questService.update(id, body);
    return newQuest;
  }

  @Delete(':id')
  async deliteQuest(@Param('id') id: number) {
    const result = await this.questService.delete(id);
    return result;
  }
}

