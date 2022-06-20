import {notificationRepository} from "../iocContainer";
import {EmailService} from "../domain/email-service";
import {injectable} from "inversify";

@injectable()
export class EmailScheduler {
    constructor(private emailService: EmailService) {
    }
    async emailSendRunning() {
        const sendMail = await notificationRepository.dequeueMessage()
        if (sendMail) {
            setTimeout(async () => {
                let error = await this.emailService.sendEmail(sendMail.email, sendMail.subject, sendMail.message)
                console.log("error: ", error)
                await notificationRepository.updateMessage(sendMail._id)
                await this.emailSendRunning()
            }, 1000)
        }
    }
}