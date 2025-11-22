import {
  Controller,
  Post,
  Get,
  Body,
  Delete,
  Param,
  Patch,
  SetMetadata,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { QuestService } from './quests.service';
import { QuestQueryDto } from './dto/quest-query-dto';
import { CreateQuestDto } from './dto/quest-dto';
import { IS_PUBLIC_KEY } from 'src/decorators/public.decorator';
import { StorageService } from 'src/storage/storage.service';
import { FileInterceptor } from '@nestjs/platform-express';


@SetMetadata(IS_PUBLIC_KEY, true)
@Controller('quests')
export class QuestController {
  constructor(
    private readonly questService: QuestService,
    private readonly storageService: StorageService, //-------?

  ) {}

  @Post()
  @UseInterceptors(FileInterceptor('picture'))
  create(@Body() dto: CreateQuestDto, @UploadedFile() file: Express.Multer.File) {

    // console.log(dto,file);
    return this.questService.create(dto,file);
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

