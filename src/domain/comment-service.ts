import {commentsRepo} from "../repositories/comments-repo";
import {v4} from "uuid";


export const commentService = {
    async getCommaById(id: string, page: number, pageSize: number) {
        const comm = await commentsRepo.getCommaById(id, page, pageSize)
        return comm
    },

    async getCommentById(id: string) {
        const comment = await commentsRepo.getById(id)
        return comment
    },

    async createComments(postId: string, content: string, userId: string, userLogin: string) {
        const newComment = {
            id: v4(),
            postId,
            content,
            userId,
            userLogin,
            addedAt: new Date()
        }
        return await commentsRepo.createComments(newComment)


    },

    async updComments(id: string, content: string) {
        const update = await commentsRepo.updComments(id, content)
        return update
    },

    async deleteById(id: string) {
        return await commentsRepo.deleteById(id)
    },

}
