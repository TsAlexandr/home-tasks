import {Router, Request, Response} from "express";
import {authService, usersService} from "../iocContainer";


export const authRouter = Router({})

authRouter.post('/login', async (req: Request, res: Response) => {
    const {login, password} = req.body
    const result = await authService.checkCredentials(login, password)
    if (result.resultCode === 0) {
        res.status(200).send(result.data)
    } else {
        res.sendStatus(401)
    }
})

authRouter.post('/registration', async (req: Request, res: Response) => {
    const {login, email, password} = req.body
    const user = await usersService.createUser(login, email, password)
    if (!user) {
        res.sendStatus(400)
    } else {
        res.status(201).send()
    }

})

authRouter.post('/registration-confirmation', async (req: Request, res: Response) => {
    const code = req.body.code
    const result = await authService.confirmEmail(code)
    if (!result) {
        res.sendStatus(400)
    } else {
        res.sendStatus(204)
    }
})

authRouter.post('/registration-email-resending', async (req: Request, res: Response) => {
    const result = await authService.resendRegistrationCode(req.body.email)
    if (!result) {
        res.sendStatus(400)
    } else {
        res.sendStatus(204)
    }
})