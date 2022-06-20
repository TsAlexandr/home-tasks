import {notificationRepository} from "../iocContainer";


export class EmailScheduler {
    private _isRunning: boolean;
    constructor() {
        this._isRunning = false;
    }
    async emailSend(sendEmail: (...args: any) => Promise<any>) {
        this._isRunning = true;
        const sendMail = await notificationRepository.dequeueMessage()
        if (sendMail) {
            setTimeout(async () => {
                let error = await sendEmail(sendMail.email, sendMail.message, sendMail.subject)
                await notificationRepository.updateMessage(sendMail._id)
                await this.emailSend(sendEmail)
            }, 1000)
        }else{
            this._isRunning = false;
        }
    }
}