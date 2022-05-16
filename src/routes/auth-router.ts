import {Router, Request, Response} from "express";
import {authService} from "../domain/auth-service";


export const authRouter = Router({})

authRouter.post('/login', async (req: Request, res: Response) => {
    const {login, password} = req.body
    const user = await authService.checkCredentials(login, password)
        if(user) {
            const token = await jwtService.createJWT(user)
            res.status(200).send(token)
        } else {
            res.sendStatus(401)
        }
})