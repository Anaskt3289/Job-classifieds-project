/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose" />
import { User } from './schemas/onboard.schema';
import { OnboardRepository } from './onboard.repository';
import { JwtService } from '@nestjs/jwt';
import { MailService } from 'src/common/mail.service';
export declare class UserService {
    private readonly onboardRepository;
    private readonly jwtService;
    private readonly mailService;
    constructor(onboardRepository: OnboardRepository, jwtService: JwtService, mailService: MailService);
    delete(userId: any): Promise<{
        status: number;
        message: string;
    }>;
    fetchUsers(): Promise<{
        status: number;
        message: string;
        resultSet: (User & import("mongoose").Document<any, any, any> & {
            _id: any;
        })[];
    }>;
    changePassword(data: any): Promise<{
        status: number;
        message: string;
    }>;
    sentOtpForForgotPassword(data: any): Promise<{
        status: number;
        message: string;
    }>;
    verifyOtpForForgotPassword(data: any): Promise<{
        status: number;
        message: string;
    }>;
}
