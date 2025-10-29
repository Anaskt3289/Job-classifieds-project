/// <reference types="mongoose/types/pipelinestage" />
import { Model } from 'mongoose';
import { Jobs, JobDocument } from './schemas/job.schema';
export declare class JobRepository {
    private jobModel;
    constructor(jobModel: Model<JobDocument>);
    findOne(userFilterQuery: any): Promise<Jobs & import("mongoose").Document<any, any, any> & {
        _id: any;
    }>;
    find(filterQuery: any): Promise<(Jobs & import("mongoose").Document<any, any, any> & {
        _id: any;
    })[]>;
    create(data: Jobs): Promise<Jobs & import("mongoose").Document<any, any, any> & {
        _id: any;
    }>;
    findOneAndUpdate(filterQuery: any, data: any): Promise<Jobs & import("mongoose").Document<any, any, any> & {
        _id: any;
    }>;
    findWithPagination(filterQuery: any, skip: number, limit: number): Promise<(Jobs & import("mongoose").Document<any, any, any> & {
        _id: any;
    })[]>;
    count(filterQuery: any): Promise<number>;
}
