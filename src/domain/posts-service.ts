import {postsRepository} from "../repositories/posts-repository";
import {PostsCon} from "../repositories/db";
import {bloggersService} from "./bloggers-service";


export const postsService = {
    async getPosts() {
        const posts = await postsRepository.getPosts()
        return posts
    },
    async getPostsById(id: number) {
        const postById = await postsRepository.getPostsById(id)
        if (postById) {
            return postById
        }
    },
    async deletePostsById(id: number) {
        return await postsRepository.deletePostsById(id)
    },
    async updatePostsById(id: number, isUpdPost: PostsCon) {
        return await postsRepository.updatePostsById({id, ...isUpdPost})
    },
    async createPosts(newPost: PostsCon)
    {
        const createPost = {
            ...newPost,
            id: +(new Date())
        }
        return await postsRepository.createPosts(createPost)
    }
}