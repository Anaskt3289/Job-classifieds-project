import { Controller, Get, Param, UseGuards, Body, Post, Query, Delete, HttpCode, Patch, UseInterceptors, Req, ParseIntPipe, Res, Inject, forwardRef, UploadedFile, UnprocessableEntityException, UploadedFiles } from '@nestjs/common';
import {ApiResponse,ApiOperation, ApiTags} from '@nestjs/swagger';
import {JobService} from './job.service'
import {UpdateJobDto} from './dto/update-job.dto'
import { CreateJobDto } from './dto/create-job.dto';

@ApiTags('Job')
@Controller('job')
export class JobController {
    constructor(
        private readonly jobService: JobService,
    ) { }

    @Post('create')
    async createJob( @Body() job_data:CreateJobDto ): Promise<any> {
        return await this.jobService.createJob(job_data);
    }

    @Patch('update')
    async updateJob( @Body() job_data:UpdateJobDto ): Promise<any> {
        return await this.jobService.updateJob(job_data);
    }

    @Get('fetch')
    async fetchJobs( @Query() filters ): Promise<any> {
        return await this.jobService.fetchJobs(filters);
    }

}
