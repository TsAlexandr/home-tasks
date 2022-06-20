import {notificationRepository} from "../iocContainer";
import {EmailService} from "../domain/email-service";


export class EmailScheduler {
    private _isRunning: boolean
    constructor(private emailService: EmailService) {
        this._isRunning = false
    }
    async emailSend() {
        this._isRunning = true
        const sendMail = await notificationRepository.dequeueMessage()
        if (sendMail) {
            setTimeout(async () => {
                let error = await this.emailService.sendEmail(sendMail.email, sendMail.message, sendMail.subject)
                await notificationRepository.updateMessage(sendMail._id)
                await this.emailSend()
            }, 1000)
        }else{
            this._isRunning = false
        }
    }
}