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
    async emailSendRunning() {
        this._isRunning = true
        const sendMail = await notificationRepository.dequeueMessage()
        if (sendMail) {
            setTimeout(async () => {
                let error = await this.emailService.sendEmail(sendMail.email, sendMail.subject, sendMail.message)
                console.log(error)
                await notificationRepository.updateMessage(sendMail._id)
                await this.emailSendRunning()
            }, 1000)
        }else{
            this._isRunning = false
        }
    }
}