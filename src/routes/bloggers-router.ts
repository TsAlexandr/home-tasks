import {Router} from "express";
import {bloggersRepository} from "../repositories/bloggers-repository";
import {bloggers} from "../repositories/db";
import {body, validationResult} from "express-validator";
import {inputValidator} from "../middlewares/input-validator-middlewares";

const reg = /^https:\/\/([a-zA-Z0-9_-]+\.)+[a-zA-Z0-9_-]+$/

const blogValid = () => {
    body('name')
        .trim()
        .isLength({min: 2, max: 15})
        .withMessage('Max 15 symbols')
        .matches(/^[\w ]*$/)
        .withMessage('Only letters/numbers-_ and whitespace')
}

const urlValid = () => {
    body('youtubeUrl')
        .matches(reg)
        .withMessage('Please enter a valid url')
}

export const bloggersRouter = Router({})

bloggersRouter.get('/', (req, res) => {
    const bloggers = bloggersRepository.getBloggers()
    res.send(bloggers)
})

    .get('/:id', (req, res) => {
    const id = +req.params.id
    const blogger = bloggersRepository.getPostsById(id)
    if (blogger) {
        res.send(blogger)
    }
})

    .put('/:id', blogValid, urlValid, inputValidator, (req, res) => {
    const id = parseInt(req.params.id);
    const blogger = bloggersRepository.updatePostsById(id)
    if (blogger === undefined) {
        res.send(404).json({})
    } else {
        blogger.name = req.body.name
        blogger.youtubeUrl = req.body.youtubeUrl
        res.status(204).send(blogger)
    }
})

    .post('/', blogValid, urlValid, inputValidator,(req, res) => {
    const newBlogger = bloggersRepository.createPosts(req.body.name, req.body.youtubeUrl)
    res.send(newBlogger)
    if ((newBlogger.youtubeUrl)) {
        res.send(400).json({})

    } else if (newBlogger) {
        res.send(201).send(newBlogger)

    }
})

    .delete('/:id', (req, res) => {
    const id = parseInt(req.params.id)
    const delBlog = bloggersRepository.deletePostsById(id)
    if (delBlog < 0) {
        res.send(404).json({})
    } else {
        bloggers.splice(delBlog, 1)
        res.send(204)
    }
})