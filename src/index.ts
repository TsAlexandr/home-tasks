import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'


const app = express()


const port = process.env.PORT || 5000
app.use(cors())
app.use(bodyParser.json())
let regExp = '^https://([a-zA-Z0-9_-]+.)+[a-zA-Z0-9_-]+(/[a-zA-Z0-9_-]+)*/?$'
let reg = new RegExp(regExp)

interface Bloggers  {
    id: number,
    name: string | null
    youtubeUrl: string | null
}

interface PostsCon  {
    bloggerId: Bloggers['id'],
    title: string | null
    shortDescription: string | null
    content: string | null
    bloggerName: Bloggers['name']

}

interface ProblemDetails  {
    type: string | null
    title: string | null
    status: number | null
    detail: string | null
    instance: string | null
}

interface FieldError  {
    message: string | null
    field: string | null
}

let b: Bloggers[] = [
    {id: 1, name: 'Alex', youtubeUrl: 'https://www.google.com'},
    {id: 2, name: 'goTry', youtubeUrl: 'https://www.freecodecamp.com'},
    {id: 3, name: 'hard', youtubeUrl: 'https://www.it-incubator.eu'},
    {id: 4, name: 'dontLookBack', youtubeUrl: 'https://www.github.com'}
]

let p: PostsCon[] = [
    {
        title: "Let try",
        shortDescription: "Search",
        content: "super decision",
        bloggerId: 1,
        bloggerName: 'Alex'
    },
    {

        title: "Let try",
        shortDescription: "Search",
        content: "super decision",
        bloggerId: 2,
        bloggerName: 'goTry'
    },
    {

        title: "Let try",
        shortDescription: "Search",
        content: "super decision",
        bloggerId: 3,
        bloggerName: 'hard'
    },
    {

        title: "Let try",
        shortDescription: "Search",
        content: "super decision",
        bloggerId: 4,
        bloggerName: 'dontLookBack'
    }]

let problem: FieldError[] = [{
    message: "The field YoutubeUrl must match the regular expression '^https://([a-zA-Z0-9_-]+.)+[a-zA-Z0-9_-]+(/[a-zA-Z0-9_-]+)*/?$'.",
    field: "youtubeUrl"
}]

let detail: ProblemDetails[] = [{
    type: "string",
    title: "string",
    status: 0,
    detail: "string",
    instance: "string"
}]


app.get('/hs_01/api/bloggers', (req, res) => {
    res.send(b)
})

app.get('/hs_01/api/bloggers/:id', (req, res) => {
    const id = +req.params.id
    const blogger = b.find(v => v.id === id)
    if (blogger) {
        res.send(blogger)
    }
})

app.post('/hs_01/api/bloggers', (req, res) => {
    const newBlogger = {
        id: req.body.id,
        name: req.body.name,
        youtubeUrl: req.body.youtubeUrl
    }
    b.push(newBlogger)
    res.send(newBlogger)
    if (!reg.test(newBlogger.youtubeUrl)) {
        res.send(400).json({problem})

    } else if (newBlogger) {
        res.send(201).json(newBlogger)

}

app.put('/hs_01/api/bloggers/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const blogger = b.find(blogger => blogger.id === id)
    if (blogger === undefined) {
        res.send(404).json({detail})
    } else {
        blogger.name = req.body.name
        blogger.youtubeUrl = req.body.youtubeUrl
        res.send(204).json(blogger)
    }
})


app.delete('/hs_01/api/bloggers/:id', (req, res) => {
    const id = parseInt(req.params.id)
    const delBlog = b.findIndex(delBlog => delBlog.id != id)
    if (delBlog < 0) {
        res.send(404).json({detail})
    } else {
        b.splice(delBlog, 1)
        res.send(204)
    }
})

app.get('/hs_01/api/posts', (req, res) => {
    res.send(p)
})

app.get('/hs_01/api/posts/:id', (req, res) => {
    const id = +req.params.id
    const posts = p.find(posts => posts.bloggerId === id)
    if (posts) {
        res.send(posts)
    } else {
        res.send(404).json({detail})
    }
})

app.post('/hs_01/api/posts', (req, res) => {
    const newPost: PostsCon = {
        bloggerId: req.body.id,
        title: req.body.title,
        shortDescription: req.body.shortDescription,
        content: req.body.content,
        bloggerName: req.body.bloggerName
    }
    if(!newPost) {
        res.send(400).json({problem})
    } else {
        p.push(newPost)
        res.send(200).send(newPost)
    }
})


})

app.put('/hs_01/api/posts/:id', (req, res) => {
    const id = parseInt(req.params.id)
    const post = p.find(post => post.bloggerId === id)
    if (post) {
        post.title = req.body.title
        res.send(204).json(post)
    } else {
        res.send(400).json({problem})
    }
})

app.delete('/hs_01/api/posts/:id', (req, res) => {
    const id = +req.params.id
    const delPost = p.findIndex(delPost => delPost.bloggerId === id)
    if (delPost < 0) {
        res.send(404).json({detail})
    } else {
        p.slice(delPost, 1)
        res.send(204)
    }
})




app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})




