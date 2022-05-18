import {Router, Request, Response} from "express";
import {authService} from "../domain/auth-service";


export const authRouter = Router({})

authRouter.post('/login', async (req: Request, res: Response) => {
    const {login, password} = req.body
    const result = await authService.checkCredentials(login, password)
        if(result.resultCode === 0) {
            res.status(200).send(result.data)
        } else {
            res.sendStatus(401)
        }
})

authRouter.post('/registration', async (req: Request, res: Response) => {
    const {login, email, password} = req.body
    const user = await authService.createUser(login, email, password)
    if (!user) {
        res.sendStatus(400)
    }else {
        res.status(201).send()
    }

})

authRouter.post('/confirm-email', async (req: Request, res: Response) => {
    const result = await authService.confirmEmail(req.body.login)
    if(!result) {
        res.sendStatus(400)
    } else {
        res.sendStatus(201)
    }
})

authRouter.post('/resend-registration-code', async (req: Request, res: Response) => {

})