import {Router} from "express";
import {postsRepository} from "../repositories/posts-repository";
import {posts} from "../repositories/db";
import {inputValidator} from "../middlewares/input-validator-middlewares";


export const contentRouter = Router({})


contentRouter.get('/', async (req, res) => {
    const posts = await postsRepository.getPosts()
    res.send(posts)
})

    .get('/:id',

        inputValidator,
        async (req, res) => {
        const postCon = await postsRepository.getPostsById(+req.params.id)
            if (postCon) {
                res.send(postCon)
            } else {
                res.status(404)
            }
    })

    .post('/', async (req, res) => {
        const newPost = await postsRepository.createPosts(
            req.body.title,
            req.body.shortDescription,
            req.body.content,
            req.body.bloggerName)
            if (newPost) {
                res.status(400)
            } else {
                posts.push(newPost)
                res.send(newPost)
            }
    })

    .put('/:id', async (req, res) => {
        const post = await postsRepository.updatePostsById(
            +req.params.id,
            req.body.title,
            req.body.content,
            req.body.shortDescription
        )
            if (post) {
                res.sendStatus(204)
            } else {
                res.sendStatus(400)
            }
    })

    .delete('/:id', async (req, res) => {
        const isDeleted = await postsRepository.deletePostsById(+req.params.id)
            if (isDeleted) {
                res.sendStatus(404)
            } else {
                res.sendStatus(204)
            }
    })
