import {Router, Request, Response} from "express";
import {
    getPage,
    inputValidator,
    isValidComma,
    isValidId,
    isValidPage,
    isValidPost
} from "../middlewares/input-validator-middlewares";
import {checkAuth} from "../middlewares/basic-auth";
import {authMiddleware} from "../middlewares/auth-middleware";
import {bloggersRepository, commentsService, postsRepository, postsService} from "../iocContainer";

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
            const bloggerId = req.body.bloggerId
            const blogger = await bloggersRepository.getBloggersById(bloggerId)
            if (!blogger) {
                res.status(400).send(
                    {
                        errorsMessages:
                            [{
                                message: "invalid",
                                field: "bloggerId"
                            }],
                        resultCode: 1
                    })
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

    .get('/:postId/comments',
        isValidPage,
        inputValidator,
        async (req: Request, res: Response) => {
            const postId = req.params.postId
            const {page, pageSize} = getPage(req.query)
            const isPost = await postsService.getPostsById(postId)
            if (!isPost) {
                res.sendStatus(404)
                return
            } else {
                const commInPages = await commentsService.getCommaById(postId, page, pageSize)
                res.status(200).send(commInPages)
            }

        })

    .post('/:postId/comments',
        authMiddleware,
        isValidComma,
        inputValidator,
        async (req: Request, res: Response) => {
            const postId = req.params.postId
            const post = await postsService.getPostsById(postId)
            if (!post) {
                res.sendStatus(404)
                return
            }
            const content: string = req.body.content
            const userId = req.user!.id
            const userLogin = req.user!.login
            const newPost = await commentsService.createComments(postId, content, userId, userLogin)
            if (!newPost) {
                res.sendStatus(404)
                return
            } else {
                res.status(201).send(newPost)
            }

        })

    .get('/:id',
        inputValidator,
        async (req: Request, res: Response) => {
            const id = req.params.id
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
            const id = req.params.id
            const findPost = await postsRepository.getPostsById(id)
            if (!findPost) {
                res.sendStatus(404)
                return
            }
            const updPost = {
                title: req.body.title,
                content: req.body.content,
                shortDescription: req.body.shortDescription,
                bloggerId: req.body.bloggerId
            }
            const bloggerUpd = await bloggersRepository.getBloggersById(updPost.bloggerId)
            if (!bloggerUpd) {
                res.status(400).send({errorsMessages: [{message: 'invalid', field: "bloggerId"}], resultCode: 1})
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
            const id = req.params.id
            const isDeleted = await postsService.deletePostsById(id)
            if (!isDeleted) {
                res.sendStatus(404)
            } else {
                res.sendStatus(204)
            }
        })




