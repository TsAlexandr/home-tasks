import {bloggersCollection, postsCollection, PostsCon} from "./db";

export const postsRepository = {
    async getPosts() {
        const posts = await postsCollection.find({}, {projection: {_id:0}}).toArray()
        return posts
    },
    async getPostsById(id: number) {
        const postsById = await postsCollection.findOne({id})
            if(postsById) {
                return {
                    id: postsById.id,
                    title: postsById.title,
                    content: postsById.content,
                    shortDescription: postsById.shortDescription,
                    bloggerId: postsById.bloggerId,
                    bloggerName: postsById.bloggerName
                }
            } else {
                return false
            }
    },
    async deletePostsById(id: number) {
        const delPost = await postsCollection.deleteOne({id})
        return delPost.deletedCount === 1
    },
    async updatePostsById
        (
        id: number,
        title: string,
        content: string,
        shortDescription: string,
        bloggerId: number
        ) {
            const updPosts = await postsCollection.updateOne(
            {id},
                {
                    $set: {
                        "title": title,
                        "content": content,
                        "shortDescription": shortDescription,
                        "bloggerId": bloggerId
                         }
                    })
            return updPosts.matchedCount === 1
    },
    async createPosts(newPost: PostsCon, id: number, name: string) {
        const bloggerId = await bloggersCollection.findOne({id})
        const bloggerName = await bloggersCollection.findOne({name})
        await postsCollection.insertOne(newPost, {
            forceServerObjectId: true
        })
        if (bloggerId && bloggerName) {
            return {
                id: +(new Date()),
                title: newPost.title,
                shortDescription: newPost.shortDescription,
                content: newPost.content,
                bloggerName: newPost.bloggerName,
                bloggerId: newPost.bloggerId
            }
        }
    }
}