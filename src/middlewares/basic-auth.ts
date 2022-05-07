import {Request, Response, NextFunction} from "express";


export const checkAuth = async (req: Request, res: Response, next: NextFunction) => {
    const auth = {login: 'admin', password: 'qwerty'}

    // parse login and password from headers
    const b64auth = (req.headers.authorization || '').split(' ')[1] || ''
    const [login, password] = Buffer.from(b64auth, 'base64').toString().split(':')

    // Verify login and password are set and correct
    if (login && password && login === auth.login && password === auth.password) {

        next()
    }
}