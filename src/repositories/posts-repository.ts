import {bloggersCollection, postsCollection, PostType} from "./db";
import {bloggersRepository} from "./bloggers-repository";

export type NewPostType = {
    title: string | null;
    shortDescription: string | null;
    content: string | null;
    bloggerId: number;
}

export type PostToPushType = {
    id: number;
    title: string | null;
    shortDescription: string | null;
    content: string | null;
    bloggerId: number;
}

export const postsRepository = {

    async getPosts() {
        const allPosts = await postsCollection.find().toArray()
        const allPostsWithNames = allPosts.map(p=>({
            id: p.id,
            title: p.title,
            shortDescription: p.shortDescription,
            content: p.content,
            bloggerId: p.bloggerId,
            bloggerName: "Prohor"
        }))
        return allPostsWithNames
    },
    async getPostById(id: number) {
        const post = await postsCollection.findOne({id: id})
        if(!post) return false
        const blogger = await bloggersRepository.getBloggersById(post.bloggerId)
        if(!blogger) return false
            delete post._id
            return ({
                id: post.id,
                title: post.title,
                shortDescription: post.shortDescription,
                content: post.content,
                bloggerId: post.bloggerId,
                bloggerName: blogger.name
            })
    },
    async createPost(newPost: PostToPushType) {
        await postsCollection.insertOne(newPost)
        const postToReturn = await postsCollection.findOne({id: newPost.id})
        delete postToReturn._id
        return   ({
            id: postToReturn.id,
            title: postToReturn.title,
            shortDescription: postToReturn.shortDescription,
            content: postToReturn.content,
            bloggerId: postToReturn.bloggerId,
            bloggerName: await bloggersCollection.findOne({id: postToReturn.bloggerId})
        })
    },
    async updatePostById (newPost: PostToPushType) {
        const id = newPost.id
        const result = await postsCollection.updateOne({id}, {$set:{
                title: newPost.title,
                shortDescription: newPost.shortDescription,
                content: newPost.content,
                bloggerId: newPost.bloggerId
            }})
        return result.modifiedCount === 1
    },

    async deletePostById(id: number) {
        const result = await postsCollection.deleteOne({id})
        return result.deletedCount === 1
    }
}