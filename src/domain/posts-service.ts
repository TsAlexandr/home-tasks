import {postsRepository} from "../repositories/posts-repository";


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
    async updatePostsById
        (
        id: number,
        title: string,
        content: string,
        shortDescription: string,
        bloggerId: number
        ) {
        return await postsRepository.updatePostsById
        (
            id,
            title,
            content,
            shortDescription,
            bloggerId
        )
    },
    async createPosts
        (
        title : string,
        shortDescription: string,
        content: string,
        bloggerId: number,
        bloggerName: string
        )
    {
        const newPost = {
            id: +(new Date()),
            title: title,
            shortDescription: shortDescription,
            content: content,
            bloggerId: bloggerId,
            bloggerName: bloggerName
        }
        return await postsRepository.createPosts(newPost)
    }
}