import {Router} from "express";
import {bloggersService} from "../domain/bloggers-service";
import {body, check} from "express-validator";
import {inputValidator} from "../middlewares/input-validator-middlewares";
import * as url from "url";


const reg = /^https:\/\/([a-zA-Z0-9_-]+\.)+[a-zA-Z0-9_-]+$/

export const bloggersRouter = Router({})

bloggersRouter.get('/',
    async (req, res) => {
    const url_parts = url.parse(req.url, true)

    const name = url_parts.query.name

        // @ts-ignore
        const pageSize = parseInt(req.query.pageSize)

        // @ts-ignore
        const pageNumber = parseInt(req.query.pageNumber)

    let currentName
        if(typeof name === "string") {
            currentName = name
        } else if(Array.isArray(name) && name[0]) {
            currentName = name[0]
        }


        // @ts-ignore
        const bloggers = await bloggersService.getBloggers(currentName, pageNumber, pageSize)
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
