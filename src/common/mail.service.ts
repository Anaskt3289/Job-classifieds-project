import { Injectable } from '@nestjs/common';
import * as sgMail from '@sendgrid/mail';

@Injectable()
export class MailService {
  constructor() {
    const apiKey = process.env.SENDGRID_API_KEY;
    if (!apiKey) {
      throw new Error('SENDGRID_API_KEY not set');
    }
    sgMail.setApiKey(apiKey);
  }

  async forgotPasswordOtpMail(to: string, mail_data) {
    try {
      const { otp,fullname } = mail_data;

      const msg = {
        to,
        from: process.env.EMAIL_FROM || "", // must be verified
        templateId: process.env.FORGOT_PASSWORD_OTP_TEMPLATE_ID || "",
        dynamicTemplateData: {
          fullname,
          otp,
        },
      };

      const result = await sgMail.send(msg);
      console.log('Email sent successfully', result);
      return result;
    } catch (err) {
      console.error('Error while sending email for registration >>>', err);
      throw err;
    }
  }
}
