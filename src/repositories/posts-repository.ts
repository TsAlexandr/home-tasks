import {postsCollection, PostsCon, UpdPost} from "./db";

import {bloggersRepository} from "./bloggers-repository";

export const postsRepository = {
    async getPosts() {
        const posts = await postsCollection.find({}, ).toArray()
        return posts
    },
    async getPostsById(id: number) {
        const postsById = await postsCollection.findOne({id}, {projection: {_id:0}})
        if(!postsById) return false
        const blogger = await bloggersRepository.getBloggersById(postsById.bloggerId)
        if (!blogger) return false
            return ({
                id: postsById.id,
                title: postsById.title,
                content: postsById.content,
                shortDescription: postsById.shortDescription,
                bloggerId: postsById.bloggerId,
                bloggerName: blogger.name
            })

    },
    async deletePostsById(id: number) {
        const delPost = await postsCollection.deleteOne({id})
        return delPost.deletedCount === 1
    },
    async updatePostsById(isUpdPost: UpdPost) {
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
        return updPosts.modifiedCount === 1
    },
    async createPosts(newPost: PostsCon) {
        await postsCollection.insertOne(newPost, {
            forceServerObjectId: true
        })
        return newPost
    }

}