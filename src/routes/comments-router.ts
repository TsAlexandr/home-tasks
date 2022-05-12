import {Router, Request, Response} from "express";
import {authMiddleware} from "../middlewares/auth-middleware";
import {commentService} from "../domain/comment-service";
import {inputValidator} from "../middlewares/input-validator-middlewares";


export const commentsRouter = Router({})

commentsRouter
    .put('/', authMiddleware, inputValidator,
        async (req: Request, res: Response) => {
            const updComment = await commentService.updComments(req.body.content, req.params._id)
            res.status(201).send(updComment)
        })
    .get('/:id', inputValidator,
        async (req: Request, res: Response) => {
        const id = parseInt(req.params.id)
        const comment = await commentService.commentsById(id)
            if (!comment) {
                res.status(400)
            } else {
                res.send(comment).status(200)
            }
    })
    .delete('/:id'), authMiddleware, inputValidator,
    async (req: Request, res: Response) => {
        const id = parseInt(req.params.id)
        const delCom = await commentService.deleteById(id)
            if (!delCom) {
                res.status(404)
            } else {
                res.status(204)
            }
}