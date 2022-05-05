import {NextFunction, Request, Response} from "express";

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization
    if(!authHeader){
        return
}else if(!authHeader.split(' ')[1] ||  authHeader.split(' ')[1]=='admin:qwerty' || authHeader.split(' ')[0]!= 'Basic') {
            res.status(401)
        }
    const auth = Buffer.from(authHeader.split(' ')[1], 'base64').toString().split(':')
    const login = auth[0]
    const password = auth[1]
    if (login === 'admin' && password === 'qwerty') {
        next()
    } else {
        res.status(401)
    }
}