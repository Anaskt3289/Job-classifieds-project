import { Controller, Get, Param, UseGuards, Body, Post, Query, Delete, HttpCode, Patch, UseInterceptors, Req, ParseIntPipe, Res, Inject, forwardRef, UploadedFile, UnprocessableEntityException, UploadedFiles } from '@nestjs/common';
import {ApiResponse,ApiOperation, ApiTags} from '@nestjs/swagger';
import {OnboardService} from './onboard.service'
import {SignupDto} from './dto/signup.dto'
import { LoginDto } from './dto/login.dto';

@ApiTags('Onboard')
@Controller('onboard')
export class OnboardController {
    constructor(
        private readonly onboardService: OnboardService,
    ) { }

    @Post('signup')
    async signup( @Body() signupdata:SignupDto ): Promise<any> {
        return await this.onboardService.signup(signupdata);
    }

    @Post('login')
    async login( @Body() logindata:LoginDto ): Promise<any> {
        return await this.onboardService.login(logindata);
    }

}
