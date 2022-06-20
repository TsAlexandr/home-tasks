import {bloggersCollection, commentsCollection, postsCollection, usersCollection} from "../repositories/db";


export async function removeAll() {
    await bloggersCollection.deleteMany({})
    await postsCollection.deleteMany({})
    await usersCollection.deleteMany({})
    await commentsCollection.deleteMany({})
}