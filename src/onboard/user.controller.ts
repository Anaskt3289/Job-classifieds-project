import { Controller, Get, Param, UseGuards, Body, Post, Query, Delete, HttpCode, Patch, UseInterceptors, Req, ParseIntPipe, Res, Inject, forwardRef, UploadedFile, UnprocessableEntityException, UploadedFiles } from '@nestjs/common';
import {ApiResponse,ApiOperation, ApiTags} from '@nestjs/swagger';
import { UserService } from './user.service';

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
}
