import {NextFunction, Request, Response} from "express";
import {validationResult} from "express-validator";

export const inputValidatorMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            data: {},
            resultCode: 1,
            errorsMessage: errors.array().map(e => {
                return {
                    message: e.msg,
                    field: e.param
                }
            })
        });
    }
    next()
}