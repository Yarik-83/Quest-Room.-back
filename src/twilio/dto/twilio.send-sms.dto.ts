
import { IsString,  } from 'class-validator';
import { ITwiliosendSms } from '../interface';

export class TwilioSendSmsDto implements ITwiliosendSms {
   @IsString() number: string;
   @IsString() sms: string;
}