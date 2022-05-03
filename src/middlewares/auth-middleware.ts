import {NextFunction, Request, Response} from "express";

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    if (req.query.login === 'admin' && req.query.password === 'qwerty') {
        next()
    } else {
        res.status(401)
    }
}