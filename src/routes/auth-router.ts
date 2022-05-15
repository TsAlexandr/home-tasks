import {Router, Request, Response} from "express";
import {usersService} from "../domain/users-service";
import {jwtService} from "../application/jwt-service";
import {authService} from "../domain/auth-service";


export const authRouter = Router({})

authRouter.post('/login', async (req: Request, res: Response) => {
    const user = await authService.checkCredentials(req.body.login, req.body.password)
        if(user) {
            const token = await jwtService.createJWT(user)
            res.status(201).send(token)
        } else {
            res.sendStatus(401)
        }
})