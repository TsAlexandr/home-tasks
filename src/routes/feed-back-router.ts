import {Router} from "express";
import {authMiddleware} from "../middlewares/auth-middleware";
import {commentService} from "../domain/comment-service";


export const commentsRouter = Router({})

commentsRouter
    .post('/', authMiddleware,
        async (req, res) => {
            const newComment = await commentService.sendComments(req.body.comment, req.user._id)
            res.status(201).send(newComment)
    })
    .get('/', async (req, res) => {
        const users = await commentService
            .allComments()
        res.send(users)
    })