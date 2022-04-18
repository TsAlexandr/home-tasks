import {postsRepository} from "../repositories/posts-repository";
import {PostsCon} from "../repositories/db";
import {bloggersService} from "./bloggers-service";


export const postsService = {
    async getPosts() {
        return postsRepository.getPosts()
    },
    async getPostsById(id: number) {
        return postsRepository.getPostsById(id)
    },
    async deletePostsById(id: number) {
        return postsRepository.deletePostsById(id)
    },
    async updatePostsById(id: number, isUpdPost: PostsCon) {
        return postsRepository.updatePostsById({id, ...isUpdPost})
    },
    async createPosts(newPost: PostsCon) {
            const createPost = {
                ...newPost,
                id: +(new Date())
        }
            return postsRepository.createPosts(createPost)
        }
}