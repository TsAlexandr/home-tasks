import {Router} from "express";
import {inputValidator} from "../middlewares/input-validator-middlewares";
import {postsService} from "../domain/posts-service";
import {body, check} from "express-validator";
import {bloggersService} from "../domain/bloggers-service";

export const contentRouter = Router({})


contentRouter.get('/', async (req, res) => {
    const posts = await postsService.getPosts()
        if(!posts) {
            res.sendStatus(400)
        } else {
            res.send(posts)
        }
})

    .get('/:id',
        check('id').isNumeric(),
        inputValidator,
        async (req, res) => {
        const id = +req.params.id
        const postCon = await postsService.getPostsById(id)
            if (!postCon) {
                res.status(404)
            } else {
                res.send(postCon).status(200)
            }
    })

    .post('/',
        body('title')
            .isString()
            .trim()
            .not()
            .isEmpty(),
        body('shortDescription')
            .isString()
            .trim()
            .not()
            .isEmpty(),
        body('content')
            .isString()
            .trim()
            .not()
            .isEmpty(),
        inputValidator,
        async (req, res) => {
        const bloggerId = +req.body.bloggerId
        const blogger = await bloggersService.getBloggersById(bloggerId)
            if(!blogger) {
                res.status(400)
            }
        const newPost = await postsService.createPosts
            ({
                    title: req.body.title,
                    shortDescription: req.body.shortDescription,
                    content: req.body.content,
                    bloggerId
            })
            if (!newPost) {
                res.status(400)
            } else {
                res.status(201).send(newPost)
            }
    })

    .put('/:id',
        check('id').isNumeric(),
        body('title')
            .isString()
            .trim()
            .not()
            .isEmpty(),
        body('shortDescription')
            .isString()
            .trim()
            .not()
            .isEmpty(),
        body('content')
            .isString()
            .trim()
            .not()
            .isEmpty(),
        inputValidator,
        async (req, res) => {
            const id = +req.params.id
            const isUpdPost = {
                title: req.body.title,
                content: req.body.content,
                shortDescription: req.body.shortDescription,
                bloggerId: req.body.bloggerId,
                bloggerName: req.body.bloggerName
            }
            const blogger = await bloggersService.getBloggersById(isUpdPost.bloggerId)
            if (blogger) {
                res.status(400)
            }
            const updPost = await postsService.updatePostsById(id,isUpdPost)
            if (!updPost) {
                res.status(404)
            } else {
                res.status(204).send(updPost)
            }
    })

    .delete('/:id',
        check('id').isNumeric(),
        inputValidator,
        async (req, res) => {
        const id = +req.params.id
        const isDeleted = await postsService.deletePostsById(id)
            if (!isDeleted) {
                res.status(404)
            } else {
                res.status(204)
            }
    })
