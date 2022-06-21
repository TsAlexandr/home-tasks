import {Router, Request, Response} from "express";
import {authMiddleware} from "../middlewares/auth-middleware";
import {inputValidator, isItUserCom, isValidComma} from "../middlewares/input-validator-middlewares";
import {commentsRepository, commentsService} from "../iocContainer";


export const commentsRouter = Router({})

commentsRouter
    .put('/:commentId',
        authMiddleware,
        isItUserCom,
        isValidComma,
        inputValidator,
        async (req: Request, res: Response) => {
            const id = req.params.commentId
            const content = req.body.content
            const findComment = await commentsRepository.getById(id)
            if (!findComment) {
                res.sendStatus(400)
                return
            }
            const updComment = await commentsService.updComments(id, content)
            if (!updComment) {
                res.sendStatus(404)
                return
            } else {
                res.sendStatus(204)
            }
        })
    .get('/:commentId',
        inputValidator,
        async (req: Request, res: Response) => {
            const id = req.params.commentId
            const comment = await commentsService.getCommentById(id)
            if (!comment) {
                res.sendStatus(404)
            } else {
                res.status(200).send(comment)
                console.log(comment)
            }
        })
    .delete('/:commentId',
        authMiddleware,
        isItUserCom,
        inputValidator,
        async (req: Request, res: Response) => {
            const id = req.params.commentId
            const delCom = await commentsService.deleteById(id)
            if (!delCom) {
                res.sendStatus(404)
            } else {
                res.sendStatus(204)
            }
        })