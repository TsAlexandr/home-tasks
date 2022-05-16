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