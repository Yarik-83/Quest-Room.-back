import { IsString, IsNumber } from 'class-validator';
import { ICreateOrderPayload } from '../intreface';

export class CreateOrderDto implements ICreateOrderPayload {
  @IsString() name: string;
  @IsString() phone: string;
  @IsString() person: number;
  @IsNumber() clientId: number;
  @IsNumber() questId: number;
}
