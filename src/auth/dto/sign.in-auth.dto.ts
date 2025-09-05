import { IsEmail, IsNotEmpty, IsString } from "class-validator";
import { ISignAuth } from "../interface";


export class SignInDto  implements ISignAuth{
    @IsString()
    @IsNotEmpty()
    password: string;
    @IsEmail()
    @IsString()
    email: string

}