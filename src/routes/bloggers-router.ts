import {Router, Request, Response} from "express";
import {bloggersService} from "../domain/bloggers-service";
import {inputValidator, isValidBlog, isValidId} from "../middlewares/input-validator-middlewares";
// import {postsService} from "../domain/posts-service";
// import {authMiddleware} from "../middlewares/auth-middleware";

export const getPaginationData = (query: any) => {
    const pageNumber = typeof query.pageNumber === 'string' ? +query.pageNumber : 1
    const pageSize = typeof query.pageSize === 'string' ? +query.pageSize : 10
    const searchNameTerm = typeof query.searchNameTerm === 'string' ? query.searchNameTerm : ""
    return {pageNumber, pageSize, searchNameTerm}
}

export const getPageFor = (query: any) => {
    const pageNumber = typeof query.pageNumber === 'string' ? +query.pageNumber : 1
    const pageSize = typeof query.pageSize === 'string' ? +query.pageSize : 10
    return {pageNumber, pageSize}
}

export const bloggersRouter = Router({})

bloggersRouter.get('/',
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
        const {pageNumber, pageSize, searchNameTerm} = getPaginationData(req.query)

        const bloggers = await bloggersService.getBloggers(searchNameTerm, pageNumber, pageSize)
        res.status(200).send(bloggers)
    })

    .post('/',
        isValidBlog,
        //authMiddleware,
        inputValidator,
        async (req: Request, res: Response) => {
            const newBlogger = await bloggersService.createBlogger(
                req.body.name,
                req.body.youtubeUrl
            )
            if (newBlogger) {
                res.status(201).send(newBlogger)
            } else {
                res.status(400)

            }
        })

    .get('/:id',
        isValidId,
        inputValidator,
        async (req: Request, res: Response) => {
            const id = +req.params.id
            const blogger = await bloggersService.getBloggersById(id)
            if (blogger) {
                res.send(blogger).status(200)
            } else {
                res.sendStatus(404)
            }
        })

    .put('/:id', isValidId,
        isValidBlog,
        //authMiddleware,
        inputValidator,
        async (req: Request, res: Response) => {
            const id = +req.params.id
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
            }
        })

    .delete('/:id',
        isValidId,
        //authMiddleware,
        inputValidator,
        async (req: Request, res: Response) => {
            const id = +req.params.id
            const isDeleted = await bloggersService.deleteBloggerById(id)
            if (isDeleted) {
                res.sendStatus(204)
            } else {
                res.sendStatus(404)
            }
        })


    // .get('/:id/posts',
    //     isValidId,
    //     inputValidator,
    //     async (req: Request, res: Response) => {
    //         const bloggerId = parseInt(req.params.id)
    //         const {pageSize, pageNumber} = getPageFor(req.query)
    //         const blogger = await bloggersService.getBloggersById(bloggerId)
    //         if(!blogger) {
    //             res.status(404)
    //         } else {
    //         const pages = await postsService.getPostsById(bloggerId, pageSize, pageNumber)
    //             res.status(200).send(pages)
    //         }
    //     })
    //
    // .post('/:id/posts',
    //     isValidId,
    //     authMiddleware,
    //     inputValidator,
    //     async (req: Request, res: Response) => {
    //         const bloggerId = parseInt(req.params.id)
    //         const newPostForBlogger = await postsService.createPosts({
    //             bloggerId,
    //             title: req.body.title,
    //             shortDescription: req.body.shortDescription,
    //             content: req.body.content
    //         })
    //         if (!newPostForBlogger) {
    //             res.status(404)
    //         } else {
    //             res.status(201).send(newPostForBlogger)
    //         }
    //
    //     })