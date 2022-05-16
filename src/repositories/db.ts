import {MongoClient} from 'mongodb'

const mongoUri = process.env.MONGO_URI || "mongodb+srv://hello:rerere@cluster0.rxylv.mongodb.net/Cluster0?retryWrites=true&w=majority"
|| "mongodb://localhost:27017/?maxPoolSize=20&w=majority"

export const client = new MongoClient(mongoUri);

export const bloggersCollection = client.db("bloggers-posts").collection<Bloggers>('bloggers')
export const postsCollection = client.db("bloggers-posts").collection<PostsCon>('posts')
export const usersCollection = client.db("bloggers-posts").collection<Users>('users')
export const commentsCollection = client.db("bloggers-posts").collection<Comment>('comments')

//

export async function runDb() {
    try {
        await client.connect();
        await client.db("bloggers-posts").command({ ping: 1 });
        console.log("Connected successfully to mongo server");
    } catch {
        await client.close();
    }
}

export type Bloggers = {
    id: string,
    name: string
    youtubeUrl: string | null
}

export type PostsCon = {
    id: string,
    bloggerId: Bloggers['id'],
    title: string | null
    shortDescription: string | null
    content: string | null
    bloggerName?: Bloggers['name']
}

export type NewPost = {
    title: string | null
    shortDescription: string | null
    content: string | null
    bloggerId: Bloggers['id']
}

export type Paginator<T> = {
    pagesCount: number,
    page: number,
    pageSize: number,
    totalCount: number,
    items: T[]
}

export type Comment = {
    id: string,
    postId: PostsCon['id']
    content: string,
    userId: string,
    userLogin: string,
    addedAt: Date
}

export type Login = {
    login: string,
    password: string
}

export type LoginSuccess = {
    token: string
}

export type UserInput = {
    id: string
    login: string
}

export type Users = {
    id: string
    login: string
    passwordHash?: string
}

export interface BaseAuthData {
    login: string;
    password: string;
}