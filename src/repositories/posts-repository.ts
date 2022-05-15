import {Paginator, postsCollection, PostsCon} from "./db";

export const postsRepository = {
    async getPosts(page: number, pageSize: number) {
        const post: PostsCon[] = await postsCollection
            .find({}, {projection: {_id:0}} )
            .limit(pageSize)
            .skip((page - 1) * pageSize)
            .toArray()
        const total = await postsCollection.countDocuments({})
        const pages = Math.ceil(total/pageSize)

        const postInPages:Paginator<PostsCon> = {
            pagesCount: pages,
            page: page,
            pageSize: pageSize,
            totalCount: total,
            items: post
        }
        return postInPages
    },
    async getPostsById(id: string) {
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
    async deletePostsById(id: string) {
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
    async getPostInPages(bloggerId: string, page: number, pageSize: number) {
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