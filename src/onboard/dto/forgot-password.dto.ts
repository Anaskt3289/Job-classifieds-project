import { IsNotEmpty, IsString,IsEmail } from 'class-validator';

export class sentOtpDto {

    @IsNotEmpty()
    email: string;
    
}

export class verifyOtpDto {

    @IsNotEmpty()
    email: string;

    @IsNotEmpty()
    otp: string;
 
    @IsNotEmpty()
    newPassword: string;
    
}
