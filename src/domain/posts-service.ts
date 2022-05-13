import {postsRepository} from "../repositories/posts-repository";
import {NewPost, PostsCon} from "../repositories/db";
import {bloggersService} from "./bloggers-service";


export const postsService = {
    async getPosts(page: number, pageSize: number) {
        return await postsRepository.getPosts( page, pageSize )
    },
    async getPostsById(id: number) {
        return await postsRepository.getPostsById(id)
    },
    async deletePostsById(id: number) {
        return await postsRepository.deletePostsById(id)
    },
    async updatePostsById(id: number, name: string, updatePost: NewPost) {
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
            id: +(new Date())
        }
        return await postsRepository.createPosts(createPost)
    },
    async getPostsInPages(bloggerId: number, page: number, pageSize: number) {
        const post = await postsRepository.getPostInPages(bloggerId, page, pageSize)
        return post
    }

}