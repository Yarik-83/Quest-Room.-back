import {
  Controller,
  Get,
  Post,
  Body,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { IJwtPeyload } from 'src/interface';
import { User } from 'src/decorators/user.peyload-decorator';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async readUserById(@User() user: IJwtPeyload) {
    return await this.userService.getUserById(user.id);
  }

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }
 }
