import {Request, Response, NextFunction} from "express";

interface BaseAuthData {
    login: string;
    password: string;
}

enum BaseAuthPayload {
    login = "admin",
    password = "qwerty",
}



export const checkAuth = async (req: Request, res: Response, next: NextFunction) => {
    if (!req.headers.authorization) {
        res.send(401);
        return;
    }

    if (req.headers.authorization.split(" ")[0] !== "Basic") {
        res.send(401);
        return;
    }

    const token = req.headers.authorization.split(" ")[1];

    const decodedBaseData = authService.decodeBaseAuth(token);

    if (
        (decodedBaseData.login !== BaseAuthPayload.login,
        decodedBaseData.password !== BaseAuthPayload.password)
    ) {
        res.send(401);
        return;
    }

    next();



}

const authService = {

    decodeBaseAuth(token: string): BaseAuthData {
        const buff = Buffer.from(token, "base64");

        const decodedString = buff.toString("ascii");

        const loginAndPassword = decodedString.split(":");

        return {
            login: loginAndPassword[0],
            password: loginAndPassword[1],
        };
    }
}