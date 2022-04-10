import {request, Request, Response, Router} from "express";
import {postsRepository} from "../repositories/posts-repository";
import {posts} from "../repositories/db";
import {body, validationResult} from "express-validator";
import {inputValidator} from "../middlewares/input-validator-middlewares";


export const contentRouter = Router({})


contentRouter.get('/', (req, res) => {
    const posts = postsRepository.getPosts()
    res.send(posts)
})

    .get('/:id',

        inputValidator,
        (req, res) => {
        const id = +req.params.id
        const postCon = postsRepository.getPostsById(id)
        if (postCon) {
            res.send(postCon).send(200)
        } else {
            res.send(404)
        }
    })

    .post('/',  (req, res) => {
        const newPost = postsRepository.createPosts(

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
        const post = postsRepository.updatePostsById(id)
        if (post) {
            post.title = req.body.title,
                res.send(204).send(post)
        } else {
            res.send(400).send({})
        }
    })

    .delete('/:id', (req, res) => {
        const id = +req.params.id
        const delPost = postsRepository.deletePostsById(id)
        if (delPost < 0) {
            res.send(404).send({})
        } else {
            posts.slice(delPost, 1)
            res.send(204)
        }
    })
