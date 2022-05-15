import {commentsRepo} from "../repositories/comments-repo";
import {postsService} from "./posts-service";
import {randomUUID} from "crypto";


export const commentService = {
    async getCommentById(id: string) {
        return await commentsRepo.getById(id)
    },

    async createComments(postId: string, content: string, userId: string, userLogin: string) {
        const post = await postsService.getPostsById(postId)
        if(!post) {
            return false
        } else {
            const newComment = {
                id: randomUUID(),
                postId,
                content,
                userId,
                userLogin,
                addedAt: (new Date()).toISOString()
            }
            return await commentsRepo.createComments(newComment)
        }

    },

    async updComments(commentId: string, content: string) {
        return await commentsRepo.updComments(commentId, content)
    },

    async deleteById(id: string) {
        return await commentsRepo.deleteById(id)
    },

}
