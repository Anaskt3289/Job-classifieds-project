import { UserService } from './user.service';
import { changePasswordDto } from './dto/change-password.dto';
import { sentOtpDto, verifyOtpDto } from './dto/forgot-password.dto';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    signup(userId: any): Promise<any>;
    fetchUsers(): Promise<any>;
    changePassword(data: changePasswordDto): Promise<any>;
    sentOtpForForgotPassword(data: sentOtpDto): Promise<any>;
    verifyOtpForForgotPassword(data: verifyOtpDto): Promise<any>;
}
