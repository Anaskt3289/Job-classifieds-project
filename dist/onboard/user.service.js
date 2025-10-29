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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const onboard_repository_1 = require("./onboard.repository");
const bcrypt = require("bcrypt");
const jwt_1 = require("@nestjs/jwt");
const mail_service_1 = require("../common/mail.service");
let UserService = class UserService {
    constructor(onboardRepository, jwtService, mailService) {
        this.onboardRepository = onboardRepository;
        this.jwtService = jwtService;
        this.mailService = mailService;
    }
    async delete(userId) {
        try {
            let deleteResponse = await this.onboardRepository.findOneAndUpdate({ _id: userId }, { is_deleted: true });
            if (deleteResponse) {
                return { status: 1, message: "Successfully deleted user" };
            }
            else
                throw new common_1.UnprocessableEntityException('Invalid user id');
        }
        catch (err) {
            console.log("error in user delete function >>>", err);
            throw new common_1.HttpException((err.response && err.response.message) || err.message || 'Failed to delete the user.', err.status || 0);
        }
    }
    async fetchUsers() {
        try {
            let userDetails = await this.onboardRepository.find({ is_deleted: false });
            return {
                status: 1,
                message: "Successfully fetched users",
                resultSet: userDetails
            };
        }
        catch (err) {
            console.log("error in user fetch function >>>", err);
            throw new common_1.HttpException((err.response && err.response.message) || err.message || 'Failed to fetch the users.', err.status || 0);
        }
    }
    async changePassword(data) {
        try {
            let { userId, currentPassword, newPassword } = data;
            let userExist = await this.onboardRepository.findOne({ _id: userId });
            if (!userExist)
                throw new common_1.NotFoundException("User not found.");
            let isPasswordTrue = await bcrypt.compare(currentPassword, userExist.password);
            if (!isPasswordTrue)
                throw new common_1.UnprocessableEntityException(`Incorrect current password. Please try again.`);
            newPassword = newPassword && await bcrypt.hash(newPassword, 10);
            await this.onboardRepository.updateOne({ _id: userId }, { password: newPassword });
            return {
                status: 1,
                message: "Successfully updated the password."
            };
        }
        catch (err) {
            console.log("error in change password function >>>", err);
            throw new common_1.HttpException((err.response && err.response.message) || err.message || 'Failed to update the password.', err.status || 0);
        }
    }
    async sentOtpForForgotPassword(data) {
        try {
            let { email } = data;
            let userExist = await this.onboardRepository.findOne({ email });
            if (!userExist)
                throw new common_1.NotFoundException("User not found.");
            let otp = Math.floor(Math.random() * 1000000).toString().padStart(6, '0');
            this.mailService.forgotPasswordOtpMail(userExist.email, { fullname: userExist.fullname, otp });
            this.onboardRepository.updateOne({ _id: userExist._id }, { otp, otp_last_updated_on: new Date() });
            return {
                status: 1,
                message: "Successfully sent the otp"
            };
        }
        catch (err) {
            console.log("error while senting forgot password otp >>>", err);
            throw new common_1.HttpException((err.response && err.response.message) || err.message || 'Failed to sent the otp.', err.status || 0);
        }
    }
    async verifyOtpForForgotPassword(data) {
        try {
            let { email, otp, newPassword } = data;
            let userExist = await this.onboardRepository.findOne({ email });
            if (!userExist)
                throw new common_1.NotFoundException("User not found.");
            if (userExist.otp_last_updated_on) {
                const now = new Date();
                const lastUpdated = new Date(userExist.otp_last_updated_on);
                const diffMs = now.getTime() - lastUpdated.getTime();
                const diffMinutes = diffMs / (1000 * 60);
                if (diffMinutes > 10) {
                    throw new common_1.UnprocessableEntityException('OTP has expired. Please request a new one.');
                }
            }
            if (otp && userExist.otp && Number(otp) == Number(userExist.otp)) {
                newPassword = newPassword && await bcrypt.hash(newPassword, 10);
                this.onboardRepository.updateOne({ _id: userExist._id }, { password: newPassword });
                return {
                    status: 1,
                    message: "Successfully verified and updated the password"
                };
            }
            else {
                throw new common_1.UnprocessableEntityException('Invalid otp');
            }
        }
        catch (err) {
            console.log("error in verifyOtpForForgotPassword function >>>", err);
            throw new common_1.HttpException((err.response && err.response.message) || err.message || 'Failed to verify the otp.', err.status || 0);
        }
    }
};
UserService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [onboard_repository_1.OnboardRepository,
        jwt_1.JwtService,
        mail_service_1.MailService])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map