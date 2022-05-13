import {Router, Request, Response} from "express";
import {getPage, inputValidator, isValidId, isValidPage, isValidPost} from "../middlewares/input-validator-middlewares";
import {postsService} from "../domain/posts-service";
import {bloggersRepository} from "../repositories/bloggers-repository";
import {checkAuth} from "../middlewares/basic-auth";
import {postsRepository} from "../repositories/posts-repository";

export const postsRouter = Router({})

postsRouter
    .get('/',
        isValidPage,
        inputValidator,
        async (req: Request, res: Response) => {
            const {page, pageSize} = getPage(req.query)
            const posts = await postsService.getPosts(page, pageSize)
            res.status(200).send(posts)
        })

    .post('/',
        checkAuth,
        isValidPost,
        inputValidator,
        async (req: Request, res: Response) => {
            const bloggerId = parseInt(req.body.bloggerId)
            const blogger = await bloggersRepository.getBloggersById(bloggerId)
            if (!blogger) {
                res.status(400).send(
                    { errorsMessages:
                            [{ message: "invalid",
                                field: "bloggerId" }],
                                    resultCode: 1 })
                return
            } else {
                const {title, content, shortDescription} = req.body
                const newPost = await postsService.createPosts
                ({
                    title,
                    content,
                    bloggerId,
                    shortDescription
                })
                res.status(201).send(newPost)
            }
        })

    .get('/:id/comments',
        inputValidator,
        async (req: Request, res: Response) => {
            const postId = parseInt(req.params.id)

        })

    .post('/:id/comments',
        inputValidator,
        async (req: Request, res: Response) => {
            const postId = parseInt(req.params.id)
            const {pageNumber, pageSize} = req.query
            const getCom = await postsService.getComments(postId, pageNumber, pageSize)
            if (!getCom) {
                res.status(400)
            } else {
                res.send(getCom)
            }
        })

    .get('/:id',
        isValidId,
        inputValidator,
        async (req: Request, res: Response) => {
            const id = +req.params.id
            const post = await postsService.getPostsById(id)
            if (!post) {
                res.sendStatus(404)
                return
            } else {
                res.status(200).send(post)
            }
        })


    .put('/:id',
        checkAuth,
        isValidPost,
        inputValidator,
        async (req: Request, res: Response) => {
            const id = +req.params.id
            const findPost = await postsRepository.getPostsById(id)
            if(!findPost) {
                res.sendStatus(404)
                return
            }
            const updPost = {
                title: req.body.title,
                content: req.body.content,
                shortDescription: req.body.shortDescription,
                bloggerId: parseInt(req.body.bloggerId)
            }
            const bloggerUpd = await bloggersRepository.getBloggersById(updPost.bloggerId)
            if (!bloggerUpd) {
                res.status(400).send({ errorsMessages: [{ message: 'invalid', field: "bloggerId" }], resultCode: 1 })
                return
            }
            const updatePost = await postsService.updatePostsById(id, bloggerUpd.name, updPost)
            if (!updatePost) {
                res.sendStatus(404)
                return
            } else {
                res.sendStatus(204)
            }
        })

    .delete('/:id',
        checkAuth,
        isValidId,
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




