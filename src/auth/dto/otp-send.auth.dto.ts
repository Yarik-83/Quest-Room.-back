import { PickType } from "@nestjs/mapped-types";
import { CreateUserDto } from "../../user/dto/create-user.dto";
import { IOtpSend } from "../interface";

export class OtpSendDto extends PickType(CreateUserDto, ['phone'] as const ) implements IOtpSend {}
