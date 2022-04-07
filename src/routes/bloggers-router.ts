import {Router} from "express";
import {bloggersRepository} from "../repositories/bloggers-repository";
import {bloggers} from "../repositories/db";
import {body, validationResult} from "express-validator";


export const bloggersRouter = Router({})

bloggersRouter.get('/', (req, res) => {
    const bloggers = bloggersRepository.getBloggers()
    res.send(bloggers)
})

    .get('/:id', (req, res) => {
    const id = +req.params.id
    const blogger = bloggers.find(b => b.id === id)
    if (blogger) {
        res.send(blogger)
    }
})

    .put('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const blogger = bloggers.find(b => b.id === id)
    if (blogger === undefined) {
        res.send(404).json({})
    } else {
        blogger.name = req.body.name
        blogger.youtubeUrl = req.body.youtubeUrl
        res.send(204).json(blogger)
    }
})

    .post('/', (req, res) => {
    const newBlogger = {
        id: req.body.id,
        name: req.body.name,
        youtubeUrl: req.body.youtubeUrl
    }
    bloggers.push(newBlogger)
    res.send(newBlogger)
    if ((newBlogger.youtubeUrl)) {
        res.send(400).json({})

    } else if (newBlogger) {
        res.send(201).json(newBlogger)

    }
})

    .delete('/:id', (req, res) => {
    const id = parseInt(req.params.id)
    const delBlog = bloggers.findIndex(delBlog => delBlog.id != id)
    if (delBlog < 0) {
        res.send(404).json({})
    } else {
        bloggers.splice(delBlog, 1)
        res.send(204)
    }
})