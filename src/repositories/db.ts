import {MongoClient} from 'mongodb'

const mongoUri =
    process.env.mongoURI = "mongodb://localhost:27017/?maxPoolSize=20&w=majority";

export const client = new MongoClient(mongoUri);

export async function runDb() {
    try {
        // Connect the client to the server
        await client.connect();
        // Establish and verify connection
        await client.db("bloggers - posts").command({ ping: 1 });
        console.log("Connected successfully to mongo server");

    } catch {
        // Ensures that the client will close when you finish/error
        await client.close();
    }
}

export const bloggersCollection = client.db().collection('bloggers-management')



interface PostsCon {
    id: number
    bloggerId?: Bloggers['id'],
    title: string | null
    shortDescription: string | null
    content: string | null
    bloggerName: Bloggers['name']

}

interface Bloggers {
    id: number,
    name: string | null
    youtubeUrl: string | null
}

export let bloggers: Bloggers[] = [
    {id: 1, name: 'Alex', youtubeUrl: 'https://www.google.com'},
    {id: 2, name: 'goTry', youtubeUrl: 'https://www.freecodecamp.com'},
    {id: 3, name: 'hard', youtubeUrl: 'https://www.it-incubator.eu'},
    {id: 4, name: 'dontLookBack', youtubeUrl: 'https://www.github.com'}
]


export let posts: PostsCon[] = [
    {
        id: 1,
        title: "Let try",
        shortDescription: "Search",
        content: "super decision",
        bloggerId: 1,
        bloggerName: 'Alex'
    },
    {
        id: 2,
        title: "write",
        shortDescription: "reason",
        content: "group therapy",
        bloggerId: 2,
        bloggerName: 'goTry'
    },
    {
        id: 3,
        title: "a good",
        shortDescription: "watch",
        content: "new version",
        bloggerId: 3,
        bloggerName: 'hard'
    },
    {
        id: 4,
        title: "code",
        shortDescription: "more",
        content: "clockwork",
        bloggerId: 4,
        bloggerName: 'dontLookBack'
    }]