import nodemailer from 'nodemailer'
import {injectable} from "inversify";
import {emailType} from "../repositories/db";
import {emailScheduler, notificationRepository} from "../iocContainer";

export const templateService = {
    getConfirmMessage(confirmationCode: string) {
        return `<a href="https://homework00001.herokuapp.com/auth/registration-confirmation?confirmCode=${confirmationCode}">${confirmationCode}</a>`
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
        try {
            await transporter.sendMail({
                from: 'Alex Gerber', // sender address
                to: email, // list of receivers
                subject: subject, // Subject line
                html: message, // html body
            }, (err) => err)
        }catch (e) {
            console.log(e)
        }
    }
    async addMessageInQueue(message: emailType) {
        const result = await notificationRepository.enqueueMessage(message)
        if (result) await emailScheduler.emailSend(this.sendEmail)
        return result
    }
}