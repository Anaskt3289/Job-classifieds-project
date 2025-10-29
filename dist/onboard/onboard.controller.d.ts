import { OnboardService } from './onboard.service';
import { SignupDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
export declare class OnboardController {
    private readonly onboardService;
    constructor(onboardService: OnboardService);
    signup(signupdata: SignupDto): Promise<any>;
    login(logindata: LoginDto): Promise<any>;
}
