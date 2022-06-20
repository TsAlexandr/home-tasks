import {notificationRepository} from "../iocContainer";
import {EmailService} from "../domain/email-service";
import {injectable} from "inversify";

@injectable()
export class EmailScheduler {
    private _isRunning: boolean
    constructor(private emailService: EmailService) {
        this._isRunning = false
    }
    public get isRunning() {
        return this._isRunning
    }
    async emailSend() {
        this._isRunning = true
        const sendMail = await notificationRepository.dequeueMessage()
        if (sendMail) {
            setTimeout(async () => {
                let error = await this.emailService.sendEmail(sendMail.email, sendMail.subject, sendMail.message)
                await notificationRepository.updateMessage(sendMail._id)
                await this.emailSend()
            }, 1000)
        }else{
            this._isRunning = false
        }
    }
}