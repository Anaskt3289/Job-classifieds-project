import { Controller, Get, Param, UseGuards, Body, Post, Query, Delete, HttpCode, Patch, UseInterceptors, Req, ParseIntPipe, Res, Inject, forwardRef, UploadedFile, UnprocessableEntityException, UploadedFiles } from '@nestjs/common';
import {ApiResponse,ApiOperation, ApiTags} from '@nestjs/swagger';
import { UserService } from './user.service';
import { changePasswordDto } from './dto/change-password.dto';
import { sentOtpDto, verifyOtpDto } from './dto/forgot-password.dto';
@ApiTags('User')
@Controller('users')
export class UserController {
    constructor(
        private readonly userService: UserService,
    ) { }

    @Delete(':userId')
    async signup( @Param('userId') userId ): Promise<any> {
        return await this.userService.delete(userId);
    }

    @Get()
    async fetchUsers(): Promise<any> {
        return await this.userService.fetchUsers();
    }

    @Post('update/password')
    async changePassword(@Body() data : changePasswordDto): Promise<any> {
        return await this.userService.changePassword(data);
    }

    @Post('forgot/password/sent/otp')
    async sentOtpForForgotPassword(@Body() data : sentOtpDto): Promise<any> {
        return await this.userService.sentOtpForForgotPassword(data);
    }

    @Post('forgot/password/verify/otp')
    async verifyOtpForForgotPassword(@Body() data : verifyOtpDto): Promise<any> {
        return await this.userService.verifyOtpForForgotPassword(data);
    }
}
