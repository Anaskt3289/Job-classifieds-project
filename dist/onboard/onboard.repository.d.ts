/// <reference types="mongoose/types/pipelinestage" />
import { Model } from 'mongoose';
import { User, UserDocument } from './schemas/onboard.schema';
export declare class OnboardRepository {
    private userModel;
    constructor(userModel: Model<UserDocument>);
    findOne(userFilterQuery: any): Promise<User & import("mongoose").Document<any, any, any> & {
        _id: any;
    }>;
    find(userFilterQuery: any): Promise<(User & import("mongoose").Document<any, any, any> & {
        _id: any;
    })[]>;
    create(user: User): Promise<User & import("mongoose").Document<any, any, any> & {
        _id: any;
    }>;
    findOneAndUpdate(userFilterQuery: any, user: any): Promise<User & import("mongoose").Document<any, any, any> & {
        _id: any;
    }>;
    updateOne(userFilterQuery: any, user: any): Promise<import("mongodb").UpdateResult>;
}
