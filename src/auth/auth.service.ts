import {
  BadRequestException,
  ConflictException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';
import { UserService } from 'src/user/user.service';
import { IVerifySms } from 'src/twilio/interface';
import { TwilioService } from 'src/twilio/twilio.service';
import { TwilioDataService } from 'src/twilio/twilio.data.service';
import { IAuthCreateUser, IOtpSend, ISignAuth } from './interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly twilioService: TwilioService,
    private readonly twilioDataService: TwilioDataService,
  ) {}
  private readonly secretKey = process.env.JWT_SECRET;

  async signUp(data: IAuthCreateUser) {
    const user = await this.userService.getUser(data.email);
    if (user)
      throw new ConflictException('User with such email already exists');

    const { password } = data;
    const hashPass = await bcrypt.hash(password, 10);
    data.password = hashPass;
    this.userService.create(data);
  }

  async signIn(data: ISignAuth) {
    const user = await this.userService.getUser(data.email);

    if (!user || !user.password) {
      throw new UnauthorizedException('Invalid credentials');
    };
    if (await bcrypt.compare(data.password, user.password)) {
      const token = jwt.sign({ id: user.id }, this.secretKey!, {
        expiresIn: '1d',
      });
      return { token };
    } else {
      throw new UnauthorizedException('Wrong password or email');
    }
  };

  async twilioSendOtp(data: IOtpSend) {
   return await this.twilioService.twilioSendOtp(data.phone);
  
  };

  async twilioVerifyOtp(data: IVerifySms) {
    const twilioResult = await this.twilioService.twilioVerifyOtp(data);
    const user = await this.twilioDataService.upsertUser(data.phone);

    if (!user){
      throw new InternalServerErrorException();
    };
  
    if (twilioResult.status === 'approved') {
       const token = jwt.sign({ id: user.id }, this.secretKey!, {
        expiresIn: '1d',
      });
      return {token};
    } else if (twilioResult.status === 'pending') {
      throw new BadRequestException('Incorrect code entered. Please try again.');
    } else {
      throw new BadRequestException('Incorrect code or time expired.');
    };
  };
};
