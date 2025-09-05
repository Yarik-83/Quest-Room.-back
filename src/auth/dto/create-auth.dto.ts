import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { IAuthCreateUser } from '../interface';

export class CreateAuthDto extends  CreateUserDto implements IAuthCreateUser{} 
