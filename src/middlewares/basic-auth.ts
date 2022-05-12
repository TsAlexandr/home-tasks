import {Request, Response, NextFunction} from "express";

enum DataAdmin {
    login = 'admin',
    password = 'qwerty'
}



export const checkAuth = async (req: Request, res: Response, next: NextFunction) => {
    if (!req.headers.authorization) {
        res.sendStatus(401);
        return;
    }

    if (req.headers.authorization.split(" ")[0] !== "Basic") {
        res.sendStatus(401);
        return;
    }

    const token = req.headers.authorization.split(" ")[1];
    const decodedBaseData = authService.decodeBaseAuth(token);

    if (
        (decodedBaseData.login !== DataAdmin.login &&
            decodedBaseData.password !== DataAdmin.password)
    ) {
        res.sendStatus(401);
        return;
    }

    next();
}

