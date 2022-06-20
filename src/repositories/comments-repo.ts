import {Comment, commentsCollection, Paginator} from "./db";
import * as MongoClient from 'mongodb';
import {injectable} from "inversify";

@injectable()
export class CommentsRepository {
    constructor(private commentsCollection: MongoClient.Collection<Comment>) {
    }

    async getById(id: string) {
        const getCom = await this.commentsCollection.findOne({id}, {projection: {_id: 0}})
        if (getCom) {
            return {
                id,
                content: getCom.content,
                userId: getCom.userId,
                userLogin: getCom.userLogin,
                addedAt: getCom.addedAt
            }
        }
    }

    async getCommaById(postId: string, page: number, pageSize: number) {
        const filter = {postId}
        const commentsForPosts = await this.commentsCollection.find(filter, {projection: {_id: 0, postId: 0}})
            .limit(pageSize)
            .skip((page - 1) * pageSize)
            .toArray()
        const total = await this.commentsCollection.countDocuments(filter)
        const pages = Math.ceil(total / pageSize)

        return ({
            pagesCount: pages,
            page: page,
            pageSize: pageSize,
            totalCount: total,
            items: commentsForPosts
        })
    }

    async createComments(newComment: Comment) {
        await this.commentsCollection.insertOne(newComment, {forceServerObjectId: true})
        const newComma = await this.commentsCollection.findOne({id: newComment.id}, {
            projection: {
                postId: false,
                _id: false
            }
        })
        if (!newComma) {
            return null
        }
        return newComma
    }

    async updComments(id: string, content: string) {
        const updComment = await this.commentsCollection.findOneAndUpdate
        ({id}, {$set: {'content': content}})
        return updComment.value
    }

    async deleteById(id: string) {
        const deleteComment = await this.commentsCollection.deleteOne({id})
        return deleteComment.deletedCount === 1
    }
}
