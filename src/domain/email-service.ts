import nodemailer from 'nodemailer'

export const emailService = {
    async sendEmail(email: string, message: string, subject: string) {
        let transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: 'gerberalex210@gmail.com', // generated ethereal user
                pass: 'blbyf[eq15', // generated ethereal password
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
}