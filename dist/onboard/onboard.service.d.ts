/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose" />
import { SignupDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import { User } from './schemas/onboard.schema';
import { OnboardRepository } from './onboard.repository';
import { JwtService } from '@nestjs/jwt';
export declare class OnboardService {
    private readonly onboardRepository;
    private readonly jwtService;
    constructor(onboardRepository: OnboardRepository, jwtService: JwtService);
    signup(signupdata: SignupDto): Promise<{
        status: number;
        message: string;
        resultSet: User & import("mongoose").Document<any, any, any> & {
            _id: any;
        };
        token: string;
    }>;
    login(logindata: LoginDto): Promise<{
        status: number;
        message: string;
        resultSet: User & import("mongoose").Document<any, any, any> & {
            _id: any;
        };
        token: string;
    }>;
}
