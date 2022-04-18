import {NewPostType, postsRepository} from "../repositories/posts-repository";

export const postsService = {
    async getPosts() {
        const posts = await postsRepository.getPosts()
        return posts

    },
    async getPostById(id: number) {
        const post = await postsRepository.getPostById(id)
        if(post){
            return post
        }else return false
    },
    async createPost(newPost: NewPostType) {
        const postToPush = {
            ...newPost,
            id: +(new Date()),
        }
        return await postsRepository.createPost(postToPush)

    },
    async updatePostById(id: number, newPost: NewPostType) {
        return await postsRepository.updatePostById({
            id,
            ...newPost
        })
    },
    async deletePostById(id: number) {
        return await postsRepository.deletePostById(id)
    }
}