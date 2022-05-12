import {NextFunction, Request, Response} from "express";
import jwt from "jsonwebtoken";
import {usersRepo} from "../repositories/users-repo";
import {ObjectId} from "mongodb";


export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    if (!req.headers.authorization) {
        res.send(401)
        return
    }
    const token = req.headers.authorization.split(' ')[1]
    try {
        const decode = jwt.verify(token, 'secret')
        const user = await usersRepo.findUserById(new ObjectId(decode.userId))
        req.user = user
    } catch (e) {
        res.status(401)
    }
    next()
}
