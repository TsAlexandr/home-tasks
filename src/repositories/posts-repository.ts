import {postsCollection, PostsCon} from "./db";
import {bloggersService} from "../domain/bloggers-service";

export const postsRepository = {
    async getPosts() {
        const posts = await postsCollection.find({}, ).toArray()
        return posts
    },
    async getPostsById(id: number) {
        const postsById = await postsCollection.findOne({id}, {projection: {_id:0}})
               if (postsById) {
                   return ({
                       id: postsById.id,
                       title: postsById.title,
                       content: postsById.content,
                       shortDescription: postsById.shortDescription,
                       bloggerId: postsById.bloggerId,
                       bloggerName: postsById.bloggerName
                   })
               }
    },
    async deletePostsById(id: number) {
        const delPost = await postsCollection.deleteOne({id})
        return delPost.deletedCount === 1
    },
    async updatePostsById(isUpdPost: PostsCon) {
        const id = isUpdPost.id
        const updPosts = await postsCollection.findOneAndUpdate(
            {id},
                {
                    $set: {
                        title: isUpdPost.title,
                        content: isUpdPost.content,
                        shortDescription: isUpdPost.shortDescription,
                        bloggerId: isUpdPost.bloggerId
                         }
                    })
            return updPosts
    },
    async createPosts(newPost: PostsCon) {
        await postsCollection.insertOne(newPost, {
            forceServerObjectId: true
        })
        return newPost
    }
}