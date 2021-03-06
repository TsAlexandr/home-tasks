import {Comment, commentsCollection, Paginator} from "./db";
import * as MongoClient from 'mongodb';
import {injectable} from "inversify";

@injectable()
export class CommentsRepository {
    constructor(private commentsCollection: MongoClient.Collection<Comment>) {
    }

    async getById(id: string) {
        const getCom = await this.commentsCollection.findOne({id}, {projection: {_id: 0, postId: 0}})
        if(!getCom) return null
        return getCom
    }

    async getCommaById(postId: string, page: number, pageSize: number): Promise<Paginator<Comment[]>> {
        const filter = {postId}
        const commentsForPosts = await this.commentsCollection.find(filter, {projection: {_id: 0, postId: 0}})
            .limit(pageSize)
            .skip((page - 1) * pageSize)
            .toArray()
        const total = await this.commentsCollection.countDocuments(filter)
        const pages = Math.ceil(total / pageSize)

        const commInPages = {
            pagesCount: pages,
            page: page,
            pageSize: pageSize,
            totalCount: total,
            items: commentsForPosts
        }
        return commInPages
    }

    async createComments(newComment: Comment): Promise<Comment | null> {
        await this.commentsCollection.insertOne(newComment)
        const newComma = await this.commentsCollection.findOne<Comment>({id: newComment.id}, {
            projection: {
                postId: false,
                _id: false
            }
        })
        if(!newComma) {
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
