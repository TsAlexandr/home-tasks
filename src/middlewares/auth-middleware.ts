import {NextFunction, Request, Response} from "express";
import jwt from "jsonwebtoken";
import {usersRepo} from "../repositories/users-repo";
import {Users} from "../repositories/db";


export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    if (!req.headers.authorization) {
        res.sendStatus(401)
        return
    }

    const token = req.headers.authorization.split(' ')[1]
    const version = req.headers.authorization.split(' ')[0]
    if(version !== 'Bearer') {
        res.sendStatus(401)
        return
    }
    try {
        const decode: any = jwt.verify(token, 'secret')
        const user = await usersRepo.findById(decode.userId)
        if(!user) {
            res.sendStatus(404)
            return
        }
        // @ts-ignore
        req.user = user
    } catch (e) {
        res.sendStatus(401)
        return
    }
    next()
}
