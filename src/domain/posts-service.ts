import {postsRepository} from "../repositories/posts-repository";
import {NewPost, PostsCon} from "../repositories/db";
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
    async updatePostsById(isUpdPost: PostsCon) {
        return await postsRepository.updatePostsById(isUpdPost)
    },
    async createPosts
    (
        newPost: NewPost
    )
    {
        const blogger = await  bloggersService.getBloggersById(newPost.bloggerId)
        if(!blogger) {
            return false
        }
        const createPost = {
            ...newPost,
            bloggerName: blogger.name,
            id: +(new Date())
        }
        return postsRepository.createPosts(createPost)
    }
}