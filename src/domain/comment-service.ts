import {commentsRepo} from "../repositories/comments-repo";
import {v4} from "uuid";
import {inputComment} from "../repositories/db";


export const commentService = {
    async getCommaById(postId: string, page: number, pageSize: number) {
        const comm = await commentsRepo.getCommaById(postId, page, pageSize)
        return comm
    },

    async getCommentById(id: string) {
        const comment = await commentsRepo.getById(id)
        return comment
    },

    async createComments(newComments: inputComment) {
            return await commentsRepo.createComments(
                {
                    ...newComments,
                    addedAt: new Date(),
                    id: v4()
                })


    },

    async updComments(id: string, content: string) {
        const update = await commentsRepo.updComments(id, content)
        return update
    },

    async deleteById(id: string) {
        return await commentsRepo.deleteById(id)
    },

}
