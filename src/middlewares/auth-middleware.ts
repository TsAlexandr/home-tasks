import {NextFunction, Request, Response} from "express";

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    if (req.headers.admin === 'admin' && req.headers.password === 'qwerty') {
        next()
    } else {
        res.status(401)
    }
}