import {postsRepository} from "../repositories/posts-repository";
import {NewPost} from "../repositories/db";
import {bloggersService} from "./bloggers-service";
import {v4} from "uuid";


export const postsService = {
    async getPosts(page: number, pageSize: number) {
        return await postsRepository.getPosts( page, pageSize )
    },
    async getPostsById(id: string) {
        return await postsRepository.getPostsById(id)
    },
    async deletePostsById(id: string) {
        return await postsRepository.deletePostsById(id)
    },
    async updatePostsById(id: string, name: string, updatePost: NewPost) {
            const bloggerName = name
            return await postsRepository.updatePostsById({id, bloggerName, ...updatePost})
    },
    async createPosts(newPost: NewPost) {
        const blogger = await bloggersService.getBloggersById(newPost.bloggerId)
            if(!blogger) {
                return false
            }
        const createPost = {
            ...newPost,
            bloggerName: blogger.name,
            id: v4()
        }
        return await postsRepository.createPosts(createPost)
    },
    async getPostsInPages(bloggerId: string, page: number, pageSize: number) {
        const post = await postsRepository.getPostInPages(bloggerId, page, pageSize)
        return post
    }

}