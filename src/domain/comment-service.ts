import {CommentsRepository} from "../repositories/comments-repo";
import {v4} from "uuid";
import {injectable} from "inversify";
import {Paginator} from "../repositories/db";

@injectable()
export class CommentsService  {
    constructor(private commentsRepository: CommentsRepository) {
    }

    async getCommaById(postId: string, page: number, pageSize: number) {
        const comm = await this.commentsRepository.getCommaById(postId, page, pageSize)
        return comm
    }

    async getCommentById(id: string) {
        const comment = await this.commentsRepository.getById(id)
        return comment
    }

    async createComments(postId: string, content: string, userId: string, userLogin: string) {
        const newComment = {
            id: v4(),
            postId,
            content,
            userId,
            userLogin,
            addedAt: new Date()
        }
        return await this.commentsRepository.createComments(newComment)


    }

    async updComments(id: string, content: string) {
        const update = await this.commentsRepository.updComments(id, content)
        return update
    }

    async deleteById(id: string) {
        return await this.commentsRepository.deleteById(id)
    }

}

export interface ICommentRepository {
    getById(id: string): Promise<Comment>
    getCommaById(postId: string, page: number, pageSize: number): Promise<Comment>
    createComments(postId: string, content: string, userId: string, userLogin: string): Promise<Comment | null>
    updComments(id: string, content: string): Promise<Comment | false>
    deleteById(id: string): Promise<boolean>
}
