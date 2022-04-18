import {postsRepository} from "../repositories/posts-repository";
import {PostsCon} from "../repositories/db";
import {bloggersService} from "./bloggers-service";


export const postsService = {
    async getPosts() {
        return await postsRepository.getPosts()
    },
    async getPostsById(id: number) {
        return await postsRepository.getPostsById(id)
    },
    async deletePostsById(id: number) {
        return await postsRepository.deletePostsById(id)
    },
    async updatePostsById(id: number, isUpdPost: PostsCon) {
        const blogger = await  bloggersService.getBloggersById(isUpdPost.bloggerId)
        if(!blogger) return false
        const createPost = {
            ...isUpdPost,
            bloggerName: blogger.name
        }
        return await postsRepository.updatePostsById(createPost)
    },
    async createPosts(newPost: PostsCon)
        {
            const blogger = await  bloggersService.getBloggersById(newPost.bloggerId)
            if(!blogger) return false
            const createPost = {
                ...newPost,
                bloggerName: blogger.name,
                id: +(new Date())
        }
            return await postsRepository.createPosts(createPost)
        }
}