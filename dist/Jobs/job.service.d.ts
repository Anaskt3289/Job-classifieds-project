/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose" />
import { UpdateJobDto } from './dto/update-job.dto';
import { CreateJobDto } from './dto/create-job.dto';
import { Jobs } from './schemas/job.schema';
import { JobRepository } from './job.repository';
export declare class JobService {
    private readonly jobRepository;
    constructor(jobRepository: JobRepository);
    createJob(job_data: CreateJobDto): Promise<{
        status: number;
        message: string;
        resultSet: Jobs & import("mongoose").Document<any, any, any> & {
            _id: any;
        };
    }>;
    updateJob(job_data: UpdateJobDto): Promise<{
        status: number;
        message: string;
    }>;
    fetchJobs(filters: any): Promise<{
        status: number;
        message: string;
        resultSet: (Jobs & import("mongoose").Document<any, any, any> & {
            _id: any;
        })[];
        total_records: number;
        total_pages: number;
    }>;
}
