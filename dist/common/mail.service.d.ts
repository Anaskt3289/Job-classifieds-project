import * as sgMail from '@sendgrid/mail';
export declare class MailService {
    constructor();
    forgotPasswordOtpMail(to: string, mail_data: any): Promise<[sgMail.ClientResponse, {}]>;
}
