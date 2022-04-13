import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import {runDb} from "./repositories/db";
import {contentRouter} from "./routes/content-router";
import {bloggersRouter} from "./routes/bloggers-router";


const app = express()


const port = process.env.PORT || 5000
app.use(cors())
app.use(bodyParser.json())
app.use('/posts', contentRouter)
app.use('/bloggers', bloggersRouter)





const startApp = async () => {
    await runDb()
    app.listen(port, () => {
        console.log(`Example app listening on port: ${port}`)
    })
}

startApp()







