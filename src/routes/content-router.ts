import {Router} from "express";
import {inputValidator} from "../middlewares/input-validator-middlewares";
import {postsService} from "../domain/posts-service";
import {body, check} from "express-validator";
import {bloggersRepository} from "../repositories/bloggers-repository";

export const contentRouter = Router({})

contentRouter
    .get('/', async (req, res) => {
    // @ts-ignore
    const pageSize = parseInt(req.query.pageSize)
    // @ts-ignore
    const pageNumber = parseInt(req.query.pageNumber)
    const posts = await postsService.getPosts(pageNumber, pageSize)
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
            const post = await postsService.getPostsById(id)
            if (!post) {
                res.status(404)
            } else {
                res.status(200).send(post)
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
        check('bloggerId')
            .isNumeric(),
        inputValidator,
        async (req, res) => {
            const bloggerId = parseInt(req.body.bloggerId)
            const blogger = await bloggersRepository.getBloggersById(bloggerId)
                if(!blogger) {
                    res.status(400)
                } else {
            const newPost = await postsService.createPosts
            ({
                title: req.body.title,
                content: req.body.content,
                bloggerId,
                shortDescription: req.body.shortDescription
            })
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
            const updPost = {
                title: req.body.title,
                content: req.body.content,
                shortDescription: req.body.shortDescription,
                bloggerId: req.body.bloggerId
            }
            const bloggerUpd = await bloggersRepository.getBloggersById(updPost.bloggerId)
                if(!bloggerUpd) {
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
        check('id').isNumeric(),
        inputValidator,
        async (req, res) => {
            const id = +req.params.id
            const isDeleted = await postsService.deletePostsById(id)
            if (!isDeleted) {
                res.sendStatus(404)
            } else {
                res.sendStatus(204)
            }
        })




