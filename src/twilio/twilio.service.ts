import { Twilio } from 'twilio';
import { Injectable } from '@nestjs/common';
import { TwilioDataService } from './twilio.data.service';
import { IVerifySms } from './interface';

@Injectable()
export class TwilioService {
  private readonly twilioClient: Twilio;
  private readonly checkToken: string;

  constructor(private readonly twilioDataService: TwilioDataService) {
    const accountSid = process.env.TWILIO_ACCOUNT_SID_2!;
    const authToken = process.env.TWILIO_AUTH_TOKEN_2!;
    this.checkToken = process.env.TWILIO_CHECK_TOKEN_2!;
    this.twilioClient = new Twilio(accountSid, authToken);
  }


  async twilioSendOtp(phone: string) {
    const verification = await this.twilioClient.verify.v2
      .services(this.checkToken)
      .verifications.create({
        channel: 'sms',
        to: phone,
      });
    return verification.valid;
  }

  async twilioVerifyOtp(body: IVerifySms) {
    const verificationCheck = await this.twilioClient.verify.v2
      .services(this.checkToken)
      .verificationChecks.create({
        code: body.code,
        to: body.phone,
      });
    return verificationCheck;
  }
}
