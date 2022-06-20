import {injectable} from "inversify";
import {EmailService} from "../domain/email-service";
import {notificationRepository} from "../iocContainer";

@injectable()
export class EmailScheduler {
    private _isRunning: boolean;
    constructor(private emailService: EmailService) {
        this._isRunning = false;
    }
    async emailSend() {
        this._isRunning = true;
        const sendEmail = await notificationRepository.dequeueMessage()
        if (sendEmail) {
            setTimeout(async () => {
                let error = await this.emailService.sendEmail(sendEmail.email, sendEmail.message, sendEmail.subject)
                await notificationRepository.updateMessage(sendEmail._id)
                await this.emailSend()
            }, 1000)
        }else{
            this._isRunning = false;
        }
    }
}