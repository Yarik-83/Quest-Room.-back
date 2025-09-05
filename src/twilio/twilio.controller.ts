

import { Controller, Post, Body, SetMetadata } from '@nestjs/common';
import { IS_PUBLIC_KEY } from 'src/decorators/public.decorator';
import { TwilioService } from './twilio.service';
import { TwilioSendSmsDto } from './dto/twilio.send-sms.dto';
import { VerifySmsDto } from 'src/auth/dto/verify.sms-dto';

 @SetMetadata(IS_PUBLIC_KEY, true)
@Controller()
export class TwilioController {

    constructor( private readonly twilioService: TwilioService) {}


  // @Post('test-phone')
  //   async signUpByPhone(@Body() body: {phone: string}) {
  //     console.log(body);
  //     return await this.twilioService.signUpByPhone(body)
  // }
 

  //   @Post('test-code')
  //   async verifyCode(@Body() data: {phone: string, code: string}){
  //     console.log(data,'DATA>>>>>>>>');
  //     return await this.twilioService.verifyCode(data)
  //   }


  //=========================

//     @Post('send-sms')
//  async twilioSandSms(@Body() data: {phone: string}){
//     return this.twilioService.twilioSandSms(data.phone)
//   }

//     @Post('verify-sms')
//   async verifySms(@Body() body: VerifySmsDto){
//     return this.twilioService.twilioVerifySms(body)
//   }

}
