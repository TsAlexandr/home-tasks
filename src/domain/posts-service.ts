import {PostsRepository} from "../repositories/posts-repository";
import {NewPost, Paginator, PostsCon} from "../repositories/db";
import {v4} from "uuid";
import {injectable} from "inversify";
import {bloggersService} from "../iocContainer";

@injectable()
export class PostsService {
    constructor(private postsRepository: PostsRepository) {

    }
    async getPosts(page: number, pageSize: number) {
        return await this.postsRepository.getPosts(page, pageSize)
    }
    async getPostsById(id: string) {
        return await this.postsRepository.getPostsById(id)
    }
    async deletePostsById(id: string) {
        return await this.postsRepository.deletePostsById(id)
    }
    async updatePostsById(id: string, name: string, updatePost: NewPost) {
        const bloggerName = name
        return await this.postsRepository.updatePostsById({id, bloggerName, ...updatePost})
    }
    async createPosts(newPost: NewPost) {
        const createPost = {
            ...newPost,
            id: v4()
        }
        return await this.postsRepository.createPosts(createPost)
    }
    async getPostsInPages(bloggerId: string, page: number, pageSize: number) {
        const post = await this.postsRepository.getPostInPages(bloggerId, page, pageSize)
        return post
    }

}
export interface IPostsRepository {
    getPosts(page: number, pageSize: number): Promise<Paginator<PostsCon[]>>
    getPostsById(id: string): Promise<PostsCon | false>
    deletePostsById(id: string): Promise<boolean>
    updatePostsById(updatePost: PostsCon): Promise<Boolean>
    createPosts(newPost: NewPost): Promise<PostsCon |  null>
    getPostInPages(bloggerId: string, page: number, pageSize: number): Promise<Paginator<PostsCon[]>>
}
