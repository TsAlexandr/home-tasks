import {Router, Request, Response} from "express";
import {bloggersService} from "../domain/bloggers-service";
import {
    getDataPage, getPage,
    inputValidator,
    isValidBlog,
    isValidId,
    isValidPage, isValidPost
} from "../middlewares/input-validator-middlewares";
import {checkAuth} from "../middlewares/basic-auth";
import {postsService} from "../domain/posts-service";

export const bloggersRouter = Router({})

bloggersRouter.get('/',
    isValidPage,
    inputValidator,
    async (req: Request, res: Response) => {
        // const url_parts = url.parse(req.url, true)
        //
        // const name = url_parts.query.name
        // const size = req.query.pageSize
        // const number = req.query.pageNumber
        //
        // let currentName
        // if (typeof name === "string") {
        //     currentName = name
        // } else if (Array.isArray(name) && name[0]) {
        //     currentName = name[0]
        // }
        const {page, pageSize, searchNameTerm} = getDataPage(req.query)
        const bloggers = await bloggersService.getBloggers(page, pageSize, searchNameTerm)
        res.status(200).send(bloggers)
    })

    .post('/',
        checkAuth,
        isValidBlog,
        inputValidator,
        async (req: Request, res: Response) => {
            const newBlogger = await bloggersService.createBlogger(
                req.body.name,
                req.body.youtubeUrl
            )
            if (newBlogger) {
                res.status(201).send(newBlogger)
            } else {
                res.sendStatus(400)
                return

            }
        })

    .get('/:id',
        isValidId,
        inputValidator,
        async (req: Request, res: Response) => {
            const id = req.params.id
            const blogger = await bloggersService.getBloggersById(id)
            if (blogger) {
                res.send(blogger).status(200)
            } else {
                res.sendStatus(404)
                return
            }
        })

    .put('/:id',
        checkAuth,
        isValidBlog,
        inputValidator,
        async (req: Request, res: Response) => {
            const id = req.params.id
            const {name, youtubeUrl} = req.body
            const updBlogger = await bloggersService.updateBloggerById(
                id,
                name,
                youtubeUrl
            )
            if (updBlogger) {
                res.status(204).send(updBlogger)
            } else {
                res.sendStatus(404)
                return
            }
        })

    .delete('/:id',
        checkAuth,
        isValidId,
        inputValidator,
        async (req: Request, res: Response) => {
            const id = req.params.id
            const isDeleted = await bloggersService.deleteBloggerById(id)
            if (isDeleted) {
                res.sendStatus(204)
            } else {
                res.sendStatus(404)
                return
            }
        })


    .get('/:bloggerId/posts',
        isValidPage,
        inputValidator,
        async (req: Request, res: Response) => {
            const bloggerId = req.params.bloggerId
            const {pageSize, page} = getPage(req.query)
            const blogger = await bloggersService.getBloggersById(bloggerId)
            if (!blogger) {
                res.status(404).send({
                    "errorsMessages": [{
                        message: "posts not found",
                        field: "bloggerId"
                    }],
                    "resultCode": 1
                })
                return
            } else {
                const pages = await postsService.getPostsInPages(bloggerId, pageSize, page)
                res.status(200).send(pages)
            }
        })

    .post('/:bloggerId/posts',
        checkAuth,
        isValidPost,
        inputValidator,
        async (req: Request, res: Response) => {
            const bloggerId = req.params.bloggerId
            const {title, shortDescription, content} = req.body
            const newPostForBlogger = await postsService.createPosts({
                bloggerId,
                title,
                shortDescription,
                content
            })
            if (!newPostForBlogger) {
                res.sendStatus(404)
                return
            } else {
                res.status(201).send(newPostForBlogger)
            }

        })