import nodemailer from 'nodemailer'
import {injectable} from "inversify";
import {EmailConfirmType, emailType} from "../repositories/db";
import {EmailScheduler} from "../application/email-scheduler";
import {emailScheduler, notificationRepository} from "../iocContainer";

export const templateService = {
    getConfirmMessage(confirmationCode: string) {
        return `<a href="https://homework00001.herokuapp.com/api/auth/registration-confirmation?confirmCode=${confirmationCode}">Confirm your email</a>`
    }
}

@injectable()
export class EmailService {
    async sendEmail(email: string, message: string, subject: string) {
        let transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_LOGIN, // generated ethereal user
                pass: process.env.EMAIL_PASS, // generated ethereal password
            },
        });

        // send mail with defined transport object
        let info = await transporter.sendMail({
            from: 'Alex Gerber', // sender address
            to: email, // list of receivers
            subject: subject, // Subject line
            html: message, // html body
        });
        return info
    }
    async addMessageInQueue(message: emailType) {
        const result = await notificationRepository.enqueueMessage(message)
        if(result) await emailScheduler.emailSend()
        return result
    }
}