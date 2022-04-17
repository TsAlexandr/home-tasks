import {Router} from "express";
import {inputValidator} from "../middlewares/input-validator-middlewares";
import {postsService} from "../domain/posts-service";


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
        inputValidator,
        async (req, res) => {
        const postCon = await postsService.getPostsById(+req.params.id)
            if (postCon) {
                res.send(postCon).status(200)
            } else {
                res.status(404)
            }
    })

    .post('/', async (req, res) => {
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

    .put('/:id', async (req, res) => {
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

    .delete('/:id', async (req, res) => {
        const isDeleted = await postsService.deletePostsById(+req.params.id)
            if (isDeleted) {
                res.sendStatus(404)
            } else {
                res.sendStatus(204)
            }
    })
