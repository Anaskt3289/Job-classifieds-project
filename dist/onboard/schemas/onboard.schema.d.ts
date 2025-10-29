/// <reference types="mongoose/types/pipelinestage" />
import { Document } from 'mongoose';
export type UserDocument = User & Document;
export declare class User {
    fullname: string;
    email: string;
    password: string;
    mobile_no: string;
    created_on?: Date;
    updated_on?: Date;
    is_deleted?: boolean;
    otp?: string;
    otp_last_updated_on?: Date;
}
export declare const UserSchema: import("mongoose").Schema<User, import("mongoose").Model<User, any, any, any>, any, any>;
