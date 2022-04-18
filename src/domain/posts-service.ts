import {postsRepository} from "../repositories/posts-repository";
import {PostsCon} from "../repositories/db";


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