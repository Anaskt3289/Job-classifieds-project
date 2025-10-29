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
exports.MailService = void 0;
const common_1 = require("@nestjs/common");
const sgMail = require("@sendgrid/mail");
let MailService = class MailService {
    constructor() {
        const apiKey = process.env.SENDGRID_API_KEY;
        if (!apiKey) {
            throw new Error('SENDGRID_API_KEY not set');
        }
        sgMail.setApiKey(apiKey);
    }
    async forgotPasswordOtpMail(to, mail_data) {
        try {
            const { otp, fullname } = mail_data;
            const msg = {
                to,
                from: process.env.EMAIL_FROM || "",
                templateId: process.env.FORGOT_PASSWORD_OTP_TEMPLATE_ID || "",
                dynamicTemplateData: {
                    fullname,
                    otp,
                },
            };
            const result = await sgMail.send(msg);
            console.log('Email sent successfully', result);
            return result;
        }
        catch (err) {
            console.error('Error while sending email for registration >>>', err);
            throw err;
        }
    }
};
MailService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], MailService);
exports.MailService = MailService;
//# sourceMappingURL=mail.service.js.map