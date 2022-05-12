import {MongoClient, ObjectId} from 'mongodb'

const mongoUri = process.env.MONGO_URI || "mongodb://localhost:27017/?maxPoolSize=20&w=majority"

export const client = new MongoClient(mongoUri);

export const bloggersCollection = client.db("bloggers-posts").collection<Bloggers>('bloggers')
export const postsCollection = client.db("bloggers-posts").collection<PostsCon>('posts')
export const usersCollection = client.db("bloggers-posts").collection<Users>('users')
export const commentsCollection = client.db("bloggers-posts").collection('comments')


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
    id: number,
    name: string | null
    youtubeUrl: string | null
}

export type Users = {
    id?: ObjectId
    login: string | null
    passwordHash: string
    passwordSalt: string
}

export type PostsCon = {
    id: number
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


