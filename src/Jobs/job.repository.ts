import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose'
import { Jobs, JobDocument } from './schemas/job.schema';

@Injectable()
export class JobRepository {
  constructor(@InjectModel(Jobs.name) private jobModel: Model<JobDocument>) { }

  async findOne(userFilterQuery: any) {
    return await this.jobModel.findOne(userFilterQuery)
  }

  async find(filterQuery: any) {
    return await this.jobModel.find(filterQuery).sort({ _id: -1 })
  }

  async create(data: Jobs) {
    const newUser = new this.jobModel(data);
    return await newUser.save()
  }

  async findOneAndUpdate(filterQuery: any, data) {
    return await this.jobModel.findOneAndUpdate(filterQuery, data)
  }

  async findWithPagination(filterQuery: any, skip: number, limit: number) {
    return await this.jobModel.find(filterQuery).sort({ _id: -1 }).skip(skip).limit(limit);
  }

  async count(filterQuery: any) {
    return await this.jobModel.countDocuments(filterQuery);
  }
}
