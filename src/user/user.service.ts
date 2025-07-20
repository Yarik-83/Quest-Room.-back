import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserDataService } from './user.data-service';

@Injectable()
export class UserService {
  constructor(private readonly user: UserDataService) {}

  async create(data: CreateUserDto) {
    return await this.user.create(data);
  }

  async findAll() {
    return await this.user.findAll();
  }

  async getUser(id: number, email: string) {
    return await this.user.findOne({id,email});
  }

  async updateUser(id: number, data: UpdateUserDto) {
    return await this.user.updateUser(id, data);
  }

  async remove(id: number) {
    return await this.user.deleteUser(id);
  }
}
