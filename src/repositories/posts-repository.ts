import {Paginator, postsCollection, PostsCon} from "./db";
import {bloggersRepository} from "./bloggers-repository";


export const postsRepository = {
    async getPosts(page: number, pageSize: number) {
        const post: PostsCon[] = await postsCollection
            .find({}, {projection: {_id:0}} )
            .limit(pageSize)
            .skip((page - 1) * pageSize)
            .toArray()
        const count = await postsCollection.countDocuments({})
        const total = Math.ceil(count/pageSize)

        const postInPages:Paginator<PostsCon> = {
            pagesCount: count,
            page: page,
            pageSize: pageSize,
            totalCount: total,
            items: post
        }
        return postInPages
    },
    async getPostsById(id: number) {
        const postsById = await postsCollection.findOne({id}, {projection: {_id:0}})
            if(postsById) {
                return {
                    bloggerId: postsById.bloggerId,
                    bloggerName: postsById.bloggerName,
                    content: postsById.content,
                    id,
                    shortDescription: postsById.shortDescription,
                    title: postsById.title
                }
            } else {
                return false
            }

    },
    async deletePostsById(id: number) {
        const delPost = await postsCollection.deleteOne({id})
        return delPost.deletedCount === 1
    },
    async updatePostsById(updatePost: PostsCon) {
        const id = updatePost.id
        const updPosts = await postsCollection.findOneAndUpdate({id}, {$set: {...updatePost}}, {upsert: true})
        return updPosts.value
    },
    async createPosts(createPost: PostsCon) {
        await postsCollection.insertOne(createPost, {forceServerObjectId: true})
        return createPost
    },
    async getPostInPages(bloggerId: number, page: number, pageSize: number) {
        const postsByBloggerId = await postsCollection
            .find({bloggerId}, {projection: {_id: 0}})
            .limit(page)
            .skip((pageSize - 1) * page)
            .toArray()
        const total = await postsCollection.countDocuments({bloggerId})
        const pages = Math.ceil(total / page)

        const postInPages: Paginator<PostsCon> = {
            pagesCount: pages,
            page: pageSize,
            pageSize: page,
            totalCount: total,
            items: postsByBloggerId
        }
        return postInPages
    }
}