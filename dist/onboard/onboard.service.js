"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OnboardService = void 0;
const common_1 = require("@nestjs/common");
const onboard_repository_1 = require("./onboard.repository");
const bcrypt = require("bcrypt");
const jwt_1 = require("@nestjs/jwt");
let OnboardService = class OnboardService {
    constructor(onboardRepository, jwtService) {
        this.onboardRepository = onboardRepository;
        this.jwtService = jwtService;
    }
    async signup(signupdata) {
        let { fullname, email, password, mobile_no } = signupdata;
        try {
            let userExist = await this.onboardRepository.findOne({ email });
            if (userExist)
                throw new common_1.UnprocessableEntityException("Email already registered , please login using credentials.");
            password = password && await bcrypt.hash(password, 10);
            let newUser = await this.onboardRepository.create({
                fullname,
                email,
                password,
                mobile_no,
            });
            if (newUser) {
                const payload = {
                    user_id: newUser._id,
                    email: newUser.email,
                    fullname: newUser.fullname,
                };
                const token = this.jwtService.sign(payload);
                return {
                    status: 200,
                    message: "Successfully registered the user.",
                    resultSet: newUser,
                    token
                };
            }
        }
        catch (err) {
            console.log("error in signup function >>>", err);
            throw new common_1.HttpException((err.response && err.response.message) || err.message || 'Failed to register the user.', err.status || 0);
        }
    }
    async login(logindata) {
        let { email, password } = logindata;
        try {
            let userExist = await this.onboardRepository.findOne({ email });
            if (userExist) {
                let isPasswordTrue = await bcrypt.compare(password, userExist.password);
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
                    };
                }
                else {
                    throw new common_1.UnprocessableEntityException(`Invalid Password`);
                }
            }
            else {
                throw new common_1.UnprocessableEntityException(`Email ${email} is not registered, please register and continue.`);
            }
        }
        catch (err) {
            console.log('error in login function >>>', err);
            throw new common_1.HttpException((err.response && err.response.message) || err.message || 'Login unsuccessfull.', err.status || 0);
        }
    }
};
OnboardService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [onboard_repository_1.OnboardRepository,
        jwt_1.JwtService])
], OnboardService);
exports.OnboardService = OnboardService;
//# sourceMappingURL=onboard.service.js.map