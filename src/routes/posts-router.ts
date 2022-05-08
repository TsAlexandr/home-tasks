import {Router, Request, Response} from "express";
import {inputValidator, isValidId, isValidPost} from "../middlewares/input-validator-middlewares";
import {postsService} from "../domain/posts-service";
import {check} from "express-validator";
import {bloggersRepository} from "../repositories/bloggers-repository";
import {getPageFor} from "./bloggers-router";
import {checkAuth} from "../middlewares/basic-auth";
//import {authMiddleware} from "../middlewares/auth-middleware";

export const postsRouter = Router({})

postsRouter
    .get('/',
        inputValidator,
        async (req: Request, res: Response) => {
            const {pageNumber, pageSize} = getPageFor(req.query)
            const posts = await postsService.getPosts(pageNumber, pageSize)
            if (!posts) {
                res.sendStatus(400)
            } else {
                res.send(posts)
            }
        })

    .post('/',
        isValidPost,
        check('bloggerId')
            .isNumeric(),
        checkAuth,
        inputValidator,
        async (req: Request, res: Response) => {
            const id = parseInt(req.body.bloggerId)
            const blogger = await bloggersRepository.getBloggersById(id)
            if (!blogger) {
                res.status(400)
            } else {
                const newPost = await postsService.createPosts
                ({
                    title: req.body.title,
                    content: req.body.content,
                    bloggerId: id,
                    shortDescription: req.body.shortDescription
                })
                res.status(201).send(newPost)
            }
        })

    // .get('/:id/comments',
    //     inputValidator,
    //     async (req: Request, res: Response) => {
    //         const postId = parseInt(req.params.id)
    //
    //     })
    //
    // .post('/:id/comments',
    //     inputValidator,
    //     async (req: Request, res: Response) => {
    //         const postId = parseInt(req.params.id)
    //         const {pageNumber, pageSize} = req.query
    //         const getCom = await postsService.getComments(postId, pageNumber, pageSize)
    //         if (!getCom) {
    //             res.status(400)
    //         } else {
    //             res.send(getCom)
    //         }
    //     })

    .get('/:id',
        isValidId,
        inputValidator,
        async (req: Request, res: Response) => {
            const id = +req.params.id
            const post = await postsService.getPostsById(id)
            if (!post) {
                res.status(404)
            } else {
                res.status(200).send(post)
            }
        })


    .put('/:id',
        isValidId,
        isValidPost,
        checkAuth,
        inputValidator,
        async (req: Request, res: Response) => {
            const id = +req.params.id
            const updPost = {
                title: req.body.title,
                content: req.body.content,
                shortDescription: req.body.shortDescription,
                bloggerId: req.body.bloggerId
            }
            const bloggerUpd = await bloggersRepository.getBloggersById(updPost.bloggerId)
            if (!bloggerUpd) {
                res.status(400)
            }
            const updatePost = await postsService.updatePostsById(id, updPost)
            if (!updatePost) {
                res.status(404)
            } else {
                res.status(204).send(updPost)
            }
        })

    .delete('/:id',
        isValidId,
        checkAuth,
        inputValidator,
        async (req: Request, res: Response) => {
            const id = +req.params.id
            const isDeleted = await postsService.deletePostsById(id)
            if (!isDeleted) {
                res.sendStatus(404)
            } else {
                res.sendStatus(204)
            }
        })




