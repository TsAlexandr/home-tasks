import nodemailer from 'nodemailer'
import {injectable} from "inversify";

export const templateService = {
    getConfirmMessage(confirmationCode: string) {
        return `<a href="https://homework00001.herokuapp.com/auth/registration-confirmation/?code=${confirmationCode}">${confirmationCode}</a>`
    }

}

let transporter = nodemailer.createTransport({
    service: "smtp.yandex.ru",
    auth: {
        user: process.env.EMAIL_LOGIN, // generated ethereal user
        pass: process.env.EMAIL_PASS, // generated ethereal password
    },
});


@injectable()
export class EmailService {
    async sendEmail(email: string, subject: string, message: string) {
        // send mail with defined transport object
        return await transporter.sendMail({
            from: 'Alex Gerber <agerb3r@yandex.ru>', // sender address
            to: email, // list of receivers
            subject: subject, // Subject line
            html: message, // html body
        })

    }
}