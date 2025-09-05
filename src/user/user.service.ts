import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserDataService } from './user.data-service';


@Injectable()
export class UserService {
  constructor(private readonly user: UserDataService) {}

  async create(data: CreateUserDto) {
    return await this.user.create(data);
  }

  async getUserById(id: number) {
    try{
       const user = await this.user.getUserById(id);
    if (user) {
      const {  password, ...rest } = user;
      return rest;
    }
    }catch(error){
       if (error && error.code === 'P2025') {
         return { message: 'Object with this ID not found' };
      }
    }
  }

  async getUser(email: string) {
    return await this.user.findOne({ email });
  }

 }
