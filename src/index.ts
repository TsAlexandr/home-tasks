import express, {Request, Response} from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import {runDb} from "./repositories/db";
import {postsRouter} from "./routes/posts-router";
import {bloggersRouter} from "./routes/bloggers-router";
import {commentsRouter} from "./routes/comments-router";
import {usersRouter} from "./routes/users-router";
import {authRouter} from "./routes/auth-router";
import {removeAll} from "./application/autotests";
const app = express()
const port = process.env.PORT || 5000

app.set('trust proxy', true)
app.use(bodyParser.json())
app.use(cors())
app.use('/api/posts', postsRouter)
app.use('/api/bloggers', bloggersRouter)
app.use('/api/comments', commentsRouter)
app.use('/api/users', usersRouter)
app.use('/api/auth', authRouter)

app.delete('/api/testing/all-data', (req: Request, res: Response) => {
    removeAll().then(()=> res.sendStatus(204))
})

const startApp = async () => {
    await runDb()
    app.listen(port, () => {
        console.log(`Example app listening on port: ${port}`)
    })
}

startApp()







