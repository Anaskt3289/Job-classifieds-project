import { IsNotEmpty, IsString,IsEmail } from 'class-validator';

export class changePasswordDto {

    @IsNotEmpty()
    @IsEmail()
    userId: string;

    @IsNotEmpty()
    @IsEmail()
    currentPassword: string;

    @IsNotEmpty()
    @IsString()
    newPassword: string;
    
}

