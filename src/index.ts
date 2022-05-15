import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'

import {runDb} from "./repositories/db";
import {postsRouter} from "./routes/posts-router";
import {bloggersRouter} from "./routes/bloggers-router";
import {commentsRouter} from "./routes/comments-router";
import {usersRouter} from "./routes/users-router";

const app = express()


const port = process.env.PORT || 5000
app.use(cors())
app.use(bodyParser.json())
app.use('/posts', postsRouter)
app.use('/bloggers', bloggersRouter)
app.use('/comments', commentsRouter)
app.use('/users', usersRouter)





const startApp = async () => {
    await runDb()
    app.listen(port, () => {
        console.log(`Example app listening on port: ${port}`)
    })
}

startApp()







