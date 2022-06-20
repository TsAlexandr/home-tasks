import {Request, Response, Router} from "express";
import {emailService} from "../iocContainer";


export const emailRouter = Router({})

emailRouter
    .post('/send', async (req: Request, res: Response) => {
        const {email, message, subject} = req.body
        await emailService.sendEmail(email, message, subject)

    })