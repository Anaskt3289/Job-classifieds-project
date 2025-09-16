import { Injectable, HttpException, UnprocessableEntityException } from '@nestjs/common';
import { SignupDto } from './dto/signup.dto'
import { LoginDto } from './dto/login.dto';
import { User } from './schemas/onboard.schema';
import { OnboardRepository } from './onboard.repository';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
  constructor(
    private readonly onboardRepository: OnboardRepository,
    private readonly jwtService: JwtService
  ) { }

  async delete(userId) {
    try {
      let deleteResponse = await this.onboardRepository.findOneAndUpdate({ _id : userId }, {is_deleted : true})
      if(deleteResponse){
        return {status : 1, message : "Successfully deleted user"}
      }else throw new UnprocessableEntityException('Invalid user id')
      
    } catch (err) {
      console.log("error in user delete function >>>", err);
      throw new HttpException(
        (err.response && err.response.message) || err.message || 'Failed to delete the user.',
        err.status || 0,
      );
    }
  }

  async fetchUsers() {
    try {
      let userDetails = await this.onboardRepository.find({is_deleted:false})
      return {
        status : 1,
        message : "Successfully fetched users",
        resultSet : userDetails
      }
      
    } catch (err) {
      console.log("error in user fetch function >>>", err);
      throw new HttpException(
        (err.response && err.response.message) || err.message || 'Failed to fetch the users.',
        err.status || 0,
      );
    }
  }
}
