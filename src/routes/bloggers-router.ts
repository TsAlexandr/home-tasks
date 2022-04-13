import {Router} from "express";
import {bloggersRepository} from "../repositories/bloggers-repository";
import {body} from "express-validator";
import {inputValidator} from "../middlewares/input-validator-middlewares";

const reg = /^https:\/\/([a-zA-Z0-9_-]+\.)+[a-zA-Z0-9_-]+$/

const blogValid = () => {
    body('name')
        .trim()
        .isLength({min: 2, max: 15})
        .withMessage('Max 15 symbols')
        .matches(/^[\w ]*$/)
        .withMessage('Only letters/numbers-_ and whitespace')
        .not()
        .isEmpty()
}

const urlValid = () => {
    body('youtubeUrl')
        .matches(reg)
        .withMessage('Please enter a valid url')
        .not()
        .isEmpty()
}

export const bloggersRouter = Router({})

bloggersRouter.get('/',
    async (req, res) => {
        const bloggers = await bloggersRepository.getBloggers()
        res.send(bloggers)
    })

    .get('/:id',
        async (req, res) => {
            const blogger = await bloggersRepository.getBloggersById(+req.params.id)
            if (blogger) {
                res.send(blogger)
            } else {
                res.status(404)
            }
        })

    .put('/:id',
        blogValid,
        urlValid,
        inputValidator,
        async (req, res) => {
            const updBlogger = await bloggersRepository.updateBloggerById(+req.params.id, req.body.name, req.body.youtubeUrl)
            if (updBlogger) {
                const blogger = bloggersRepository.getBloggersById(+req.params.id)
                res.status(204).send(blogger)
            } else {
                res.sendStatus(404)
            }
        })

    .post('/',
        blogValid,
        urlValid,
        inputValidator,
        async (req, res) => {
            const newBlogger = await bloggersRepository.createBlogger(req.body.name, req.body.youtubeUrl)
            if (newBlogger) {
                res.send(newBlogger)

            } else {
                res.status(400)

            }
        })

    .delete('/:id',
        async (req, res) => {
            const isDeleted = await bloggersRepository.deleteBloggerById(+req.params.id)
            if (isDeleted) {
                res.sendStatus(404)
            } else {
                res.sendStatus(204)
            }
        })