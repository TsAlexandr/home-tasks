import {Router, Request, Response} from "express";
import {authMiddleware} from "../middlewares/auth-middleware";
import {commentService} from "../domain/comment-service";
import {checkOwnership, inputValidator, isValidComma} from "../middlewares/input-validator-middlewares";
import {commentsRepo} from "../repositories/comments-repo";


export const commentsRouter = Router({})

commentsRouter
    .put('/:commentId',
        authMiddleware,
        checkOwnership,
        isValidComma,
        inputValidator,
        async (req: Request, res: Response) => {
            const id = req.params.commentId
            const content = req.body.content
            const updComment = await commentService.updComments(id, content)
            if (!updComment) {
                res.sendStatus(404)
                return
            } else {
                res.sendStatus(204)
            }
        })
    .get('/:commentId', inputValidator,
        async (req: Request, res: Response) => {
            const id = req.params.commentId
            const comment = await commentService.getCommentById(id)
            if (!comment) {
                res.sendStatus(404)
            } else {
                res.send(comment).status(200)
            }
        })
    .delete('/:commentId'),
    authMiddleware,
    checkOwnership,
    inputValidator,
    async (req: Request, res: Response) => {
        const id = req.params.commentId
        const delCom = await commentService.deleteById(id)
        if (!delCom) {
            res.sendStatus(404)
        } else {
            res.sendStatus(204)
        }
    }