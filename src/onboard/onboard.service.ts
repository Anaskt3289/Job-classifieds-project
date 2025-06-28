import { Injectable } from '@nestjs/common';
import { SignupDto } from './dto/signup.dto'
import { LoginDto } from './dto/login.dto';
import { User } from './schemas/onboard.schema';
import { OnboardRepository } from './onboard.repository';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class OnboardService {
  constructor(
    private readonly onboardRepository: OnboardRepository,
    private readonly jwtService: JwtService
  ) { }

  async signup(signupdata: SignupDto) {
    let { fullname, email, password, mobile_no } = signupdata
    try {
      password = password && await bcrypt.hash(password, 10);
      let newUser = await this.onboardRepository.create({
        fullname,
        email,
        password,
        mobile_no,
      })
      if (newUser) {
        return {
          status: 200,
          message: "Successfully registered the user.",
          resultSet: newUser
        }
      }
    } catch (err) {
      console.log("error in signup function >>>", err);

    }
  }

  async login(logindata: LoginDto) {
    let { email, password } = logindata

    try {
      let userExist = await this.onboardRepository.findOne({ email })
      if (userExist) {
        let isPasswordTrue = await bcrypt.compare(password, userExist.password)
        if (isPasswordTrue) {
          const payload = {
            user_id: userExist._id,
            email: userExist.email,
            fullname: userExist.fullname,
          };
          const token = this.jwtService.sign(payload);
          return {
            status: 200,
            message: "Authentication successfull.",
            resultSet: userExist,
            token
          }
        } else {
          return {
            status: 204,
            message: "Invalid Password.",
            resultSet: {}
          }
        }
      } else {
        return {
          status: 404,
          message: "Email not registered.",
          resultSet: {}
        }
      }
    } catch (err) {
      console.log('error in login function >>>', err);

    }

  }
}
