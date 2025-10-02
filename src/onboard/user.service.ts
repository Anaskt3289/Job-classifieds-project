import { Injectable, HttpException, UnprocessableEntityException, NotFoundException } from '@nestjs/common';
import { SignupDto } from './dto/signup.dto'
import { LoginDto } from './dto/login.dto';
import { User } from './schemas/onboard.schema';
import { OnboardRepository } from './onboard.repository';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { MailService } from 'src/common/mail.service';
@Injectable()
export class UserService {
  constructor(
    private readonly onboardRepository: OnboardRepository,
    private readonly jwtService: JwtService,
    private readonly mailService: MailService
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

  async changePassword(data) {
    try {
      let {userId , currentPassword, newPassword} = data
      let userExist = await this.onboardRepository.findOne({ _id : userId })
      if(!userExist) throw new NotFoundException("User not found.")
      let isPasswordTrue = await bcrypt.compare(currentPassword, userExist.password)
      if(!isPasswordTrue) throw new UnprocessableEntityException(`Incorrect current password. Please try again.`)
      newPassword = newPassword && await bcrypt.hash(newPassword, 10);
      await this.onboardRepository.updateOne({_id : userId}, {password : newPassword})
      return {
        status : 1,
        message : "Successfully updated the password."
      }
    } catch (err) {
      console.log("error in change password function >>>", err);
      throw new HttpException(
        (err.response && err.response.message) || err.message || 'Failed to update the password.',
        err.status || 0,
      );
    }
  }

    async sentOtpForForgotPassword(data) {
    try {
      let {email} = data
      let userExist = await this.onboardRepository.findOne({ email })
      if(!userExist) throw new NotFoundException("User not found.");
      let otp = Math.floor(Math.random() * 1000000).toString().padStart(6, '0');
      this.mailService.forgotPasswordOtpMail(userExist.email, {fullname : userExist.fullname, otp})
      this.onboardRepository.updateOne({_id : userExist._id}, {otp, otp_last_updated_on : new Date()})

      return {
        status :1,
        message  : "Successfully sent the otp"
      }
    } catch (err) {
      console.log("error while senting forgot password otp >>>", err);
      throw new HttpException(
        (err.response && err.response.message) || err.message || 'Failed to sent the otp.',
        err.status || 0,
      );
    }
  }

    async verifyOtpForForgotPassword(data) {
    try {
      let {email, otp, newPassword} = data
      let userExist = await this.onboardRepository.findOne({ email })
      if(!userExist) throw new NotFoundException("User not found.");
      if (userExist.otp_last_updated_on) {
        const now = new Date();
        const lastUpdated = new Date(userExist.otp_last_updated_on);

        // Difference in milliseconds
        const diffMs = now.getTime() - lastUpdated.getTime();
        const diffMinutes = diffMs / (1000 * 60);

        if (diffMinutes > 10) {
          throw new UnprocessableEntityException('OTP has expired. Please request a new one.');
        }
      }
      if(otp && userExist.otp && Number(otp) == Number(userExist.otp)){
        newPassword = newPassword && await bcrypt.hash(newPassword, 10);
        this.onboardRepository.updateOne({_id : userExist._id}, {password : newPassword})
        return {
          status : 1,
          message : "Successfully verified and updated the password"
        }
      }else{
        throw new UnprocessableEntityException('Invalid otp')
      }
    } catch (err) {
      console.log("error in verifyOtpForForgotPassword function >>>", err);
      throw new HttpException(
        (err.response && err.response.message) || err.message || 'Failed to verify the otp.',
        err.status || 0,
      );
    }
  }
}
