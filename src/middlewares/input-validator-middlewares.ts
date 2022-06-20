import {Request, Response, NextFunction} from "express";
import {body, check, validationResult} from "express-validator";
import {commentsService} from "../iocContainer";

const reg = /^https:\/\/([a-zA-Z0-9_-]+\.)+[a-zA-Z0-9_-]+$/
const emailValidator = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/

export const inputValidator = (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        const err = errors.array({onlyFirstError: true}).map(e => {
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
    check('id').isString()
]

export const isValidBlog = [
    body('name').isString().isLength({max: 15}).trim().not().isEmpty(),
    body('youtubeUrl').matches(reg).isLength({max: 100}).withMessage('Please enter a valid url')
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
    check('page').optional({checkFalsy: true}).isInt({gt: 1}).notEmpty(),
    check('pageSize').optional({checkFalsy: true}).isInt({gt: 1}).notEmpty()
]


export const isValidUser = [
    body('login')
        .isString()
        .isLength({min: 3, max: 10}),
    body('password')
        .isString()
        .isLength({min: 6, max: 20})
]

export const isValidComma = [
    body('content')
        .isString()
        .isLength({min: 20, max: 300})
        .not()
        .isEmpty()
]

export const isValidEmail = check('email').matches(emailValidator)
export const isValidLogin = check('login').isString()
    .isLength({min: 3, max: 10})
export const isValidPass = check('password').isString()
    .isLength({min: 6, max: 20})
export const isValidCode = check('code').isString()




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


export const isItUserCom = async (req: Request, res: Response, next: NextFunction) => {
    const commentId = req.params.commentId
    const comUser = await commentsService.getCommentById(commentId)
    if (!comUser) {
        res.sendStatus(404)
    } else if (comUser.userLogin != req.user!.login) {
        res.sendStatus(403)
    } else {
        next()
    }
}