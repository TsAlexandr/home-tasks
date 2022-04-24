import {postsRepository} from "../repositories/posts-repository";
import {NewPost, PostsCon} from "../repositories/db";


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
        const createPost = {
            ...newPost,
            id: +(new Date())
        }
        return await postsRepository.createPosts(createPost)
    },


}