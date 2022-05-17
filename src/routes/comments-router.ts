import {Router, Request, Response} from "express";
import {authMiddleware} from "../middlewares/auth-middleware";
import {commentService} from "../domain/comment-service";
import {inputValidator, isItUserCom, isValidComma} from "../middlewares/input-validator-middlewares";
import {commentsRepo} from "../repositories/comments-repo";


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
            const findComment = await commentsRepo.getById(id)
            if (!findComment) {
                res.sendStatus(400)
                return
            }
            const updComment = await commentService.updComments(id, content)
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
            const comment = await commentService.getCommentById(id)
            if (!comment) {
                res.sendStatus(404)
            } else {
                res.status(200).send(comment)
            }
        })
    .delete('/:id',
        authMiddleware,
        isItUserCom,
        inputValidator,
        async (req: Request, res: Response) => {
            const id = req.params.id
            const delCom = await commentService.deleteById(id)
            if (!delCom) {
                res.sendStatus(404)
            } else {
                res.sendStatus(204)
            }
        })