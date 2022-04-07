import express, {Request, Response} from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import {postsRepository} from "./repositories/posts-repository";
import {contentRouter} from "./routes/content-router";
import {bloggers} from "./repositories/db";
import {bloggersRouter} from "./routes/bloggers-router";


const app = express()


const port = process.env.PORT || 5000
app.use(cors())
app.use(bodyParser.json())
app.use('/posts', contentRouter)
app.use('/bloggers', bloggersRouter)
// let regExp = '^https://([a-zA-Z0-9_-]+.)+[a-zA-Z0-9_-]+(/[a-zA-Z0-9_-]+)*/?$'
// let reg = new RegExp(regExp)




app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})







