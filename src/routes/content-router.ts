import {Router} from "express";
import {inputValidator} from "../middlewares/input-validator-middlewares";
import {postsService} from "../domain/posts-service";
import {body, check} from "express-validator";


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
        inputValidator,
        async (req, res) => {
        const postCon = await postsService.getPostsById(+req.params.id)
            if (postCon) {
                res.send(postCon).status(200)
            } else {
                res.status(404)
            }
    })

    .post('/',
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
        const newPost = await postsService.createPosts
            (
            req.body.title,
            req.body.shortDescription,
            req.body.content,
            req.body.bloggerId,
            req.body.bloggerName
            )
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
        const isUpdPost = await postsService.updatePostsById
        (
            id,
            req.body.title,
            req.body.content,
            req.body.shortDescription,
            req.body.bloggerId
        )
            if (isUpdPost) {
                res.sendStatus(204)
            } else {
                res.sendStatus(404)
            }
    })

    .delete('/:id',
        check('id').isNumeric(),
        inputValidator,
        async (req, res) => {
        const isDeleted = await postsService.deletePostsById(+req.params.id)
            if (!isDeleted) {
                res.sendStatus(404)
            } else {
                res.sendStatus(204)
            }
    })
