import {NextFunction, Request, Response} from "express";

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    if (req.query.login === 'qwerty') {
        next()
    } else {
        res.status(401)
    }
}