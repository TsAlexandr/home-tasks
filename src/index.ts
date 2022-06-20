import express, {Request, Response} from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import {runDb} from "./repositories/db";
import {postsRouter} from "./routes/posts-router";
import {bloggersRouter} from "./routes/bloggers-router";
import {commentsRouter} from "./routes/comments-router";
import {usersRouter} from "./routes/users-router";
import {authRouter} from "./routes/auth-router";
import {emailRouter} from "./routes/email-router";
import {removeAll} from "./application/autotests";
const app = express()
const port = process.env.PORT || 5000

app.set('trust proxy', true)
app.use(bodyParser.json())
app.use(cors())
app.use('/posts', postsRouter)
app.use('/bloggers', bloggersRouter)
app.use('/comments', commentsRouter)
app.use('/users', usersRouter)
app.use('/auth', authRouter)

app.delete('/testing/all-data', (req: Request, res: Response) => {
    removeAll().then(()=> res.sendStatus(204))
})

const startApp = async () => {
    await runDb()
    app.listen(port, () => {
        console.log(`Example app listening on port: ${port}`)
    })
}

startApp()







