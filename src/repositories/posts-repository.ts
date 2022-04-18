import {bloggersCollection, postsCollection, PostsCon} from "./db";
import {bloggersService} from "../domain/bloggers-service";

export const postsRepository = {
    async getPosts() {
        const posts = await postsCollection.find({}, ).toArray()
        return posts
    },
    async getPostsById(id: number) {
        const postsById = await postsCollection.findOne({id}, {projection: {_id:0}})
        if (!postsById) return false
        const blogger = await bloggersService.getBloggersById(postsById.bloggerId)
        if (!blogger) return false
        const bloggerName = blogger.name
                return ({
                    id: postsById.id,
                    title: postsById.title,
                    content: postsById.content,
                    shortDescription: postsById.shortDescription,
                    bloggerId: blogger.id,
                    bloggerName
                })
    },
    async deletePostsById(id: number) {
        const delPost = await postsCollection.deleteOne({id})
        return delPost.deletedCount === 1
    },
    async updatePostsById(isUpdPost: PostsCon) {
        const id = isUpdPost.id
        const updPosts = await postsCollection.updateOne(
            {id},
                {
                    $set: {
                        title: isUpdPost.title,
                        content: isUpdPost.content,
                        shortDescription: isUpdPost.shortDescription,
                        bloggerId: isUpdPost.bloggerId
                         }
                    })
            return updPosts.matchedCount === 1
    },
    async createPosts(newPost: PostsCon) {
        await postsCollection.insertOne(newPost, {
            forceServerObjectId: true
        })
        return {
            id: +(new Date()),
            title: newPost.title,
            shortDescription: newPost.shortDescription,
            content: newPost.content,
            bloggerId: newPost.bloggerId
        }
    }
}