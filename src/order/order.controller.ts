import {
  Controller,
  Post,
  Get,
  Body,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create.order-dto';
import { User } from 'src/decorators/user.peyload-decorator';
import { IJwtPeyload } from 'src/interface';


@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
   async create(@Body() createOrderDto: CreateOrderDto ) {
     return await this.orderService.create(createOrderDto)
   }

   @Get('list')
  getUserQuests(@User()user: IJwtPeyload) {
    return this.orderService.getUserQuests(user.id);
  }
}