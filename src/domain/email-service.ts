import nodemailer from 'nodemailer'
import {injectable} from "inversify";

export const templateService = {
    getConfirmMessage(confirmationCode: string) {
        return `<a href="https://homework00001.herokuapp.com/auth/registration-confirmation/?code=${confirmationCode}">${confirmationCode}</a>`
    }

}

@injectable()
export class EmailService {
    async sendEmail(email: string, subject: string, message: string) {
        let transporter = nodemailer.createTransport({
            service: "Yandex" || "smtp.yandex.ru",
            auth: {
                user: "agerb3r@yandex.ru", // generated ethereal user
                pass: "blbyf[eq15", // generated ethereal password
            },
        })

        // send mail with defined transport object
        try {
            await transporter.sendMail({
                from: 'Alex Gerber', // sender address
                to: email, // list of receivers
                subject: subject, // Subject line
                html: message, // html body
            })
        }catch (err) {
            console.log("sendMail : ", err)
        }
    }
}