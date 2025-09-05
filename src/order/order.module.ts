
import {Module} from '@nestjs/common';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { PrismaService } from 'src/prisma.service';
import { OrderDataService } from './order.data.service';



@Module({
    controllers: [OrderController],
    providers: [OrderService, PrismaService,OrderDataService],
})
export class OrderModule {}
