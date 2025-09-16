import { Injectable, HttpException, UnprocessableEntityException, NotFoundException } from '@nestjs/common';
import { UpdateJobDto } from './dto/update-job.dto'
import { CreateJobDto } from './dto/create-job.dto';
import { Jobs } from './schemas/job.schema';
import { JobRepository } from './job.repository';
import * as bcrypt from 'bcrypt';

@Injectable()
export class JobService {
  constructor(private readonly jobRepository: JobRepository) { }

  async createJob(job_data: CreateJobDto) {
    try {
      let newJob = await this.jobRepository.create({
        ...job_data,
        created_by: job_data.user_id
      })

      return {
        status: 1,
        message: "Job created successfully",
        resultSet: newJob
      }
    } catch (err) {
      console.log("error in createJob function >>>", err);
      throw new HttpException(
        (err.response && err.response.message) || err.message || 'Failed to register the job.',
        err.status || 0,
      );
    }
  }

  async updateJob(job_data: UpdateJobDto) {
    try {
      let update_data = {}
      if (job_data?.company_name) update_data['company_name'] = job_data.company_name;
      if (job_data?.job_position) update_data['job_position'] = job_data.job_position;
      if (job_data?.description) update_data['description'] = job_data.description;
      if (job_data?.location) update_data['location'] = job_data.location;
      if (job_data?.salary) update_data['salary'] = job_data.salary;
      if (job_data?.job_type) update_data['job_type'] = job_data.job_type;
      if (job_data?.experience_required) update_data['experience_required'] = job_data.experience_required;
      if (job_data?.skills) update_data['skills'] = job_data.skills;
      if (job_data?.contact_no) update_data['contact_no'] = job_data.contact_no;
      if (job_data.user_id) update_data['updated_by'] = job_data.user_id;

      await this.jobRepository.findOneAndUpdate({ _id: job_data?.job_id }, {
        ...update_data
      })
      return {
        status: 1,
        message: "Successfully updated job details"
      }
    } catch (err) {
      console.log('error in updateJob function >>>', err);
      throw new HttpException(
        (err.response && err.response.message) || err.message || 'Failed to update job details.',
        err.status || 0,
      );
    }
  }

  async fetchJobs(filters) {
    try {
      let { location, search_term, user_id, page_no, limit } = filters;

      if(!page_no) page_no = 1;
      if(!limit) limit = 10;
      const skip = (page_no - 1) * limit;
      const criteria: any = {
        is_deleted: false // Exclude soft-deleted jobs by default
      };
      if (location) criteria.location = location;
      if (search_term) {
        const regex = new RegExp(search_term, 'i'); // case-insensitive match
        criteria.$or = [
          { company_name: regex },
          { job_position: regex },
          { location: regex },
          { job_type: regex },
          { skills: regex }
        ];
      }
      if (user_id) criteria.created_by = user_id;
      const total_records = await this.jobRepository.count(criteria);
      const job_details = await this.jobRepository.findWithPagination({ ...criteria }, skip, limit)

      if (job_details?.length) {
        return {
          status: 1,
          message: `${job_details?.length} recods found.`,
          resultSet: job_details,
          total_records,
          total_pages : Math.ceil(total_records / limit),
        }
      } else {
        throw new NotFoundException('No records found.');
      }
    } catch (err) {
      console.log('error in updateJob function >>>', err);
      throw new HttpException(
        (err.response && err.response.message) || err.message || 'Failed to fetch job.',
        err.status || 0,
      );
    }

  }
}
