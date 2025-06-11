import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {Model} from 'mongoose'
import { User, UserDocument } from './schemas/onboard.schema';

@Injectable()
export class OnboardRepository {
  constructor(@InjectModel(User.name) private userModel:Model<UserDocument>) {}
    
  async findOne(userFilterQuery:any){
    return await this.userModel.findOne(userFilterQuery)
  }

  async find(userFilterQuery:any){
    return await this.userModel.find(userFilterQuery)
  }

  async create(user:User){
    const newUser = new this.userModel(user);
    return await newUser.save()
  }

  async findOneAndUpdate(userFilterQuery:any, user:User){
    return await this.userModel.findOneAndUpdate(userFilterQuery, user)
  }
}
