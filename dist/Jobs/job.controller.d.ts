import { JobService } from './job.service';
import { UpdateJobDto } from './dto/update-job.dto';
import { CreateJobDto } from './dto/create-job.dto';
export declare class JobController {
    private readonly jobService;
    constructor(jobService: JobService);
    createJob(job_data: CreateJobDto): Promise<any>;
    updateJob(job_data: UpdateJobDto): Promise<any>;
    fetchJobs(filters: any): Promise<any>;
}
