import {Comment, commentsCollection, Paginator, postsCollection} from "./db";


export const commentsRepo = {
    async getById(id: string) {
        const getCom = await commentsCollection.findOne({id}, {projection: {_id: 0}})
        if (getCom) {
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
        ({id}, {projection: {_id: 0, postId: false}})
            .limit(pageSize)
            .skip((page - 1) * pageSize)
            .toArray()
        const total = await commentsCollection.countDocuments({id})
        const pages = Math.ceil(total / pageSize)

        const commInPages = {
            pagesCount: pages,
            page: page,
            pageSize: pageSize,
            totalCount: total,
            items: commentsForPosts
        }
        return commInPages
    },

    async createComments(newComment: Comment) {
        await commentsCollection.insertOne(newComment, {forceServerObjectId: true})
        const newComma = await commentsCollection.findOne({id: newComment.id}, {
            projection: {
                postId: false,
                _id: false
            }
        })
        if (!newComma) {
            return null
        }
        return newComma
    },

    async updComments(id: string, content: string) {
        const updComment = await commentsCollection.findOneAndUpdate
        ({id}, {$set: {'content': content}})
        return updComment.value
    },

    async deleteById(id: string) {
        const deleteComment = await commentsCollection.deleteOne({id})
        return deleteComment.deletedCount === 1
    }
}