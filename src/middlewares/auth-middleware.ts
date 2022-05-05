import {NextFunction, Request, Response} from "express";

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization
    const auth = Buffer.from(authHeader!.split(' ')[1], 'base64').toString().split(':')
    const login = auth[0]
    const password = auth[1]
    if (login === 'admin' && password === 'qwerty') {
        next()
    } else {
        res.status(401)
    }
}