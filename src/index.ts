import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import {runDb} from "./repositories/db";
import {postsRouter} from "./routes/posts-router";
import {bloggersRouter} from "./routes/bloggers-router";
<<<<<<< HEAD
import {commentsRouter} from "./routes/comments-router";
import {usersRouter} from "./routes/users-router";

=======
import {postsRouter} from "./routes/content-router";
import {authMiddleware} from "./middlewares/auth-middleware";
>>>>>>> 9139f71e0ed80428aa5566df3f7bee71561c06f0


const app = express()


const port = process.env.PORT || 5000
app.use(cors())
app.use(bodyParser.json())
app.use(authMiddleware)
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







