import {Router, Request, Response} from "express";
import {authService} from "../domain/auth-service";


export const authRouter = Router({})

authRouter.post('/login', async (req: Request, res: Response) => {
    const {login, password} = req.body
    const isUser = await authService.checkCredentials(login, password)
        if(isUser) {
            res.status(200).send(isUser.token)
        } else {
            res.sendStatus(401)
        }
})