import { Injectable } from '@nestjs/common';
import { OrderDataService } from './order.data.service';
import { ICreateOrderPayload } from './intreface';

@Injectable()
export class OrderService {
  constructor(private readonly orderDataService: OrderDataService) {}

  async create(createOrderDto: ICreateOrderPayload) {
     try{
         return this.orderDataService.create({
      name: createOrderDto.name,
      phone: createOrderDto.phone,
      person: +createOrderDto.person,
      client: { connect: { id: createOrderDto.clientId } },
      quest: { connect: { id: createOrderDto.questId } },
    });
     }catch(error){
      if(error instanceof Error)
      throw error.message
     }
  }

  async getUserQuests(id: number) {
    return this.orderDataService.getUserQuests(id);
  }
}
