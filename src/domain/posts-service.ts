import {postsRepository} from "../repositories/posts-repository";
import {NewPost, PostsCon} from "../repositories/db";
import {bloggersService} from "./bloggers-service";


export const postsService = {
    async getPosts(pageNumber: number, pageSize: number) {
        return await postsRepository.getPosts(pageSize, pageNumber)
    },
    async getPostsById(id: number) {
        return await postsRepository.getPostsById(id)
    },
    async deletePostsById(id: number) {
        return await postsRepository.deletePostsById(id)
    },
    async updatePostsById(id: number, isUpdPost: PostsCon) {
            const updPost = {
                ...isUpdPost,
                id
            }
            return await postsRepository.updatePostsById(updPost)
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


}