import {Router, Request, Response} from "express";
import {authMiddleware} from "../middlewares/auth-middleware";
import {commentService} from "../domain/comment-service";
import {inputValidator} from "../middlewares/input-validator-middlewares";
import {commentsRepo} from "../repositories/comments-repo";


export const commentsRouter = Router({})

commentsRouter
    .put('/:commentId', authMiddleware, inputValidator,
        async (req: Request, res: Response) => {
        const {commentId, content} = req.body
            const findComment = await commentsRepo.getById(commentId)
            if(!findComment) {
                res.sendStatus(400)
                return
            }
            const updComment = await commentService.updComments(commentId, content)
            if(!updComment) {
                res.sendStatus(404)
                return
            } else {
                res.sendStatus(204)
            }
        })
    .get('/:id', inputValidator,
        async (req: Request, res: Response) => {
        const id = req.params.id
        const comment = await commentService.getCommentById(id)
            if (!comment) {
                res.sendStatus(404)
            } else {
                res.send(comment).status(200)
            }
    })
    .delete('/:commentId'), authMiddleware, inputValidator,
    async (req: Request, res: Response) => {
        const id = req.params.commentId
        const delCom = await commentService.deleteById(id)
            if (!delCom) {
                res.sendStatus(404)
            } else {
                res.sendStatus(204)
            }
}