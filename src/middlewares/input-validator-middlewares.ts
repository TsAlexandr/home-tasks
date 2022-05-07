import {NextFunction, Request, Response} from "express";
import {body, check, validationResult} from "express-validator";

const reg = /^https:\/\/([a-zA-Z0-9_-]+\.)+[a-zA-Z0-9_-]+$/


export const inputValidator = (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            data: {},
            resultCode: 1,
            errorsMessage: errors.array().map((e) => ({
                message: e.msg,
                field: e.param
            }))
        })
    } else {
        next()
    }
}

export const isValidId = [
    check('id').isInt({min: 1})
]

export const isValidBlog = [
    body('name').isString().trim().not().isEmpty(),
    body('youtubeUrl').matches(reg).withMessage('Please enter a valid url')
    ]

export const isValidPost = [
    body('title')
        .isString()
        .isLength({max: 30})
        .trim()
        .not()
        .isEmpty(),
    body('shortDescription')
        .isString()
        .isLength({max: 100})
        .trim()
        .not()
        .isEmpty(),
    body('content')
        .isString()
        .isLength({max: 1000})
        .trim()
        .not()
        .isEmpty()
]

export const isValidPage = [

]

export const isValidUser = [

]

export const isValidComma = [

]