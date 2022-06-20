import {MongoClient} from 'mongodb'

const mongoUri = process.env.MONGO_URI || "mongodb+srv://hello:rerere@cluster0.rxylv.mongodb.net/Cluster0?retryWrites=true&w=majority"
    || "mongodb://localhost:27017/?maxPoolSize=20&w=majority"

export const client = new MongoClient(mongoUri);

export const bloggersCollection = client.db("bloggers-posts").collection<Bloggers>('bloggers')
export const postsCollection = client.db("bloggers-posts").collection<PostsCon>('posts')
export const usersCollection = client.db("bloggers-posts").collection<UserType>('users')
export const commentsCollection = client.db("bloggers-posts").collection<Comment>('comments')
export const enqueueMessageCollection = client.db("bloggers-posts").collection<emailType>('enqueueMessage')
export const attemptsCollection = client.db("bloggers-posts").collection<attemptsType>('attemptsCount')
//

export async function runDb() {
    try {
        await client.connect();
        await client.db("bloggers-posts").command({ping: 1});
        console.log("Connected successfully to mongo server");
    } catch {
        await client.close();
    }
}

export type Bloggers = {
    id: string,
    name: string
    youtubeUrl: string
}

export type PostsCon = {
    id: string,
    bloggerId: Bloggers['id'],
    title: string
    shortDescription: string
    content: string
    bloggerName?: Bloggers['name']
}

export type NewPost = {
    title: string
    shortDescription: string
    content: string
    bloggerId: Bloggers['id']
}

export type Paginator<T> = {
    pagesCount: number,
    page: number,
    pageSize: number,
    totalCount: number,
    items: T
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

export interface BaseAuthData {
    login: string;
    password: string;
}

export type withoutId = {
    id: string,
    content: string,
    userId: string,
    userLogin: string,
    addedAt: Date
}

export type inputComment = {
    postId: PostsCon['id']
    content: string,
    userId: string,
    userLogin: string,
}
export type EmailConfirmType = {
    isConfirmed: boolean;
    confirmationCode: string;
    expirationDate: Date;
    sentEmails: SentConfirmEmailType[];
}
export type SentConfirmEmailType = {
    sentDate: Date;
}

export type UserType = {
    accountData: UserAccount,
    loginAttempts: LoginAttempts[],
    emailConfirm: EmailConfirmType
}

export type UserAccount = {
    id: string,
    email: string
    login: string
    passwordHash: string
    createdAt: Date
}

export type LoginAttempts = {
    attemptDate: Date
    ip: string
}

export type attemptsType = {
    userIp: string
    url: string
    time: Date
}

export type emailType = {
    email: string
    message: string
    subject: string
    isSent: boolean
    createdAt: Date
}