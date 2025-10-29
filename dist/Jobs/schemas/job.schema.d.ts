/// <reference types="mongoose/types/pipelinestage" />
import { Document } from 'mongoose';
export type JobDocument = Jobs & Document;
export declare class Jobs {
    company_name: string;
    job_position: string;
    description?: string;
    location: string;
    salary?: string;
    job_type?: string;
    experience_required?: string;
    skills?: string;
    contact_no: string;
    created_by: string;
    created_on?: Date;
    updated_by?: string;
    updated_on?: Date;
    is_deleted?: boolean;
}
export declare const JobSchema: import("mongoose").Schema<Jobs, import("mongoose").Model<Jobs, any, any, any>, any, any>;
