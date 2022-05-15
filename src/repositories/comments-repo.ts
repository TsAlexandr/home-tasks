import {Comment, commentsCollection, Paginator, postsCollection, PostsCon} from "./db";


export const commentsRepo = {
    async getById(id: string) {
        const getCom = await commentsCollection.findOne({id}, {projection: {_id:0}})
            if(getCom) {
                return {
                    id,
                    content: getCom.content,
                    userId: getCom.userId,
                    userLogin: getCom.userLogin,
                    addedAt: getCom.addedAt
                }
            }
    },

    async getCommaById(id: string, page: number, pageSize: number) {
        const commentsForPosts = await commentsCollection.find
        ({id}, {projection: {_id: 0}})
            .limit(page)
            .skip((pageSize - 1) * page)
            .toArray()
        const total = await postsCollection.countDocuments({id})
        const pages = Math.ceil(total / page)

        const commInPages: Paginator<Comment> = {
            pagesCount: pages,
            page: pageSize,
            pageSize: page,
            totalCount: total,
            items: commentsForPosts
        }
        return commInPages
    },

    async createComments(newComment: Comment) {
        await commentsCollection.insertOne(newComment, {forceServerObjectId: true})
        return newComment
    },

    async updComments(commentId: string, content: string) {
        const id = commentId
        const updComment = await commentsCollection.findOneAndUpdate({id}, {$set: {'content': content}})
        return updComment.value
    },

    async deleteById(id: string) {
        const deleteComment = await commentsCollection.deleteOne({id})
        return deleteComment.deletedCount === 1
    }
}