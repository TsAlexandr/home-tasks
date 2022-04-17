import {Router} from "express";
import {bloggersService} from "../domain/bloggers-service";
import {body, check} from "express-validator";
import {inputValidator} from "../middlewares/input-validator-middlewares";

const reg = /^https:\/\/([a-zA-Z0-9_-]+\.)+[a-zA-Z0-9_-]+$/

export const bloggersRouter = Router({})

bloggersRouter.get('/',
    async (req, res) => {
        const bloggers = await bloggersService.getBloggers()
        res.status(200).send(bloggers)
    })

    .get('/:id',
        check('id').isNumeric(),
        inputValidator,
        async (req, res) => {
        const id = +req.params.id
            const blogger = await bloggersService.getBloggersById(id)
            if (blogger) {
                res.send(blogger).status(200)
            } else {
                res.sendStatus(404)
            }
        })

    .put('/:id', check('id').isNumeric(),
        body('name')
            .isString()
            .trim()
            .not()
            .isEmpty(),
        body('youtubeUrl')
            .matches(reg)
            .withMessage('Please enter a valid url'),
        inputValidator,
        async (req, res) => {
        const id = +req.params.id
            const updBlogger = await bloggersService.updateBloggerById(
                id,
                req.body.name,
                req.body.youtubeUrl
            )
            if (updBlogger) {
                res.status(204).send(updBlogger)
            } else {
                res.sendStatus(404)
            }
        })

    .post('/',
        body('name')
            .isString()
            .trim()
            .not()
            .isEmpty(),
        body('youtubeUrl')
            .matches(reg)
            .withMessage('Please enter a valid url'),
        inputValidator,
        async (req, res) => {
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

    .delete('/:id', check('id').isNumeric(),
        inputValidator,
        async (req, res) => {
            const id = +req.params.id
            const isDeleted = await bloggersService.deleteBloggerById(id)
            if (isDeleted) {
                res.sendStatus(204)
            } else {
                res.sendStatus(404)
            }
        })