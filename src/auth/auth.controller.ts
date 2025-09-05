import { Controller, Post, Body, SetMetadata } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { SignInDto } from './dto/sign.in-auth.dto';
import { IS_PUBLIC_KEY } from 'src/decorators/public.decorator';
import { VerifySmsDto } from './dto/verify.sms-dto';
import { OtpSendDto } from './dto/otp-send.auth.dto';

@SetMetadata(IS_PUBLIC_KEY, true)
@Controller('auth')
export class AuthController {
  constructor(private readonly auth: AuthService) {}

  @Post('signUp')
  signUp(@Body() data: CreateAuthDto) {
    return this.auth.signUp(data);
  }

  @Post('signIn')
  signIn(@Body() data: SignInDto) {
    return this.auth.signIn(data);
  }

  @Post('otp-send')
  async signUpBySms(@Body() data: OtpSendDto) {
    return  await this.auth.twilioSendOtp(data);
  }

  @Post('otp-verify')
  async signInBySms(@Body() body: VerifySmsDto) {
   return await this.auth.twilioVerifyOtp(body);
  }
}
