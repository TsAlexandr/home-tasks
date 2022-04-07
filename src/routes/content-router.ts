import {request, Request, Response, Router} from "express";
import {postsRepository} from "../repositories/posts-repository";
import {posts} from "../repositories/db";
import {body, validationResult} from "express-validator";

export const contentRouter = Router({})

contentRouter.get('/', (req, res) => {
    const posts = postsRepository.getPosts()
    if (posts) {
        res.send(200).send(posts)
    } else {
        res.send(400)
    }
    })

    .get('/:id', (req, res) => {
        const id = +req.params.id
        const postCon = postsRepository.getPostsById(id)
        if (postCon) {
            res.send(postCon)
        } else {
            res.send(404).json({})
        }
    })

    .post('/', body(), (req, res) => {
        const newPost = postsRepository.createPosts(
            req.body.id,
            req.body.title,
            req.body.shortDescription,
            req.body.content,
            req.body.bloggerName)
        if (newPost) {
            res.send(400).json({})
        } else {
            posts.push(newPost)
            res.send(200).send(newPost)
        }
    })

    .put('/:id', (req, res) => {
        const id = parseInt(req.params.id)
        const post = posts.find(post => post.bloggerId === id)
        if (post) {
            post.title = req.body.title
            res.send(204).json(post)
        } else {
            res.send(400).json({})
        }
    })

    .delete('/:id', (req, res) => {
        const id = +req.params.id
        const delPost = posts.findIndex(delPost => delPost.bloggerId === id)
        if (delPost < 0) {
            res.send(404).json({})
        } else {
            posts.slice(delPost, 1)
            res.send(204)
        }
    })
