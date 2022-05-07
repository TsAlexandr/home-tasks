import {bloggersCollection, Paginator, postsCollection, PostsCon} from "./db";
import {bloggersRepository} from "./bloggers-repository";


export const postsRepository = {
    async getPosts(pageNumber: number, pageSize: number) {
        const post = await postsCollection
            .find({}, {projection: {id:0}} )
            .limit(pageSize)
            .skip((pageNumber - 1) * pageSize)
            .toArray()
        const count = await postsCollection.countDocuments()
        const total = Math.ceil(count/pageSize)

        const postInPages:Paginator<PostsCon> = {
            page: pageNumber,
            pageSize: pageSize,
            totalCount: total,
            pagesCount: count,
            items: post
        }
        return postInPages
    },
    async getPostsById(id: number) {
        const postsById = await postsCollection.findOne({id}, {projection: {_id:0}})
            if(postsById === null) {
                return false
            }
        const blogger = await bloggersRepository.getBloggersById(postsById.bloggerId)
            if(!blogger) return false

            return ({
                id: id,
                title: postsById.title,
                shortDescription: postsById.shortDescription,
                content: postsById.content,
                bloggerId: postsById.bloggerId,
                bloggerName: blogger.name
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
        return updPosts.modifiedCount === 1
    },
    async createPosts(newPost: PostsCon) {
        await postsCollection.insertOne(newPost, {forceServerObjectId: true})
        return newPost
    }
}