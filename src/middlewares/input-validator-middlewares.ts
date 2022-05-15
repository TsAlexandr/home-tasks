import {NextFunction, Request, Response} from "express";
import {body, check, validationResult} from "express-validator";

const reg = /^https:\/\/([a-zA-Z0-9_-]+\.)+[a-zA-Z0-9_-]+$/

export const inputValidator = (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        const err = errors.array({ onlyFirstError: true }).map(e => {
            return {
                message: e.msg,
                field: e.param
            }
        })
        res.status(400).json({errorsMessages: err, resultCode: 1})
    } else {
        next()
    }
}

export const isValidId = [
    check('id').isInt({gt:8})
]

export const isValidBlog = [
    body('name').isString().isLength({max:15}).trim().not().isEmpty(),
    body('youtubeUrl').matches(reg).isLength({max:100}).withMessage('Please enter a valid url')
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
    check('page').optional({checkFalsy: true}).isInt({gt:1}).notEmpty(),
    check('pageSize').optional({checkFalsy: true}).isInt({gt: 1}).notEmpty()
]


export const isValidUser = [
    body('login')
        .isString()
        .isLength({min: 3, max: 10})
        .trim()
        .not()
        .isEmpty(),
    body('password')
        .isString()
        .isLength({min: 6, max: 20})
        .trim()
        .not()
        .isEmpty()
]

export const isValidComma = [
    body('content')
        .isString()
        .isLength({min: 20, max: 300})
]



export const getDataPage = (query: any) => {
    const page = typeof query.PageNumber === 'string' ? +query.PageNumber : 1
    const pageSize = typeof query.PageSize === 'string' ? +query.PageSize : 10
    const searchNameTerm = typeof query.SearchNameTerm === 'string' ? query.SearchNameTerm : ""
    return {page, pageSize, searchNameTerm}
}

export const getPage = (query: any) => {
    const page = typeof query.PageNumber === 'string' ? +query.PageNumber : 1
    const pageSize = typeof query.PageSize === 'string' ? +query.PageSize : 10
    return {page, pageSize}
}