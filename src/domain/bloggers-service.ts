import {bloggersRepository} from "../repositories/bloggers-repository";
import {postsRepository} from "../repositories/posts-repository";


export const bloggersService = {
    async getBloggers(name: string, pageSize: number, pageNumber: number ) {
        const bloggerByName = await bloggersRepository.getBloggers(name, pageSize, pageNumber)
        return bloggerByName
    },
    async getBloggersById(id: number) {
        return await bloggersRepository.getBloggersById(id)
    },
    async deleteBloggerById(id: number) {
        return  await bloggersRepository.deleteBloggerById(id)
    },
    async updateBloggerById(id: number, name: string, youtubeUrl: string) {
        return await bloggersRepository.updateBloggerById(id, name, youtubeUrl)
    },
    async createBlogger(name: string, youtubeUrl: string) {
        const newBlogger = {
            id: +(new Date()),
            name: name,
            youtubeUrl: youtubeUrl
        }
        return await bloggersRepository.createBlogger(newBlogger)
    },
    async getPages(bloggerId: number, pageNumber: number, pageSize: number) {
        return await bloggersRepository.getPagesOfPosts(bloggerId, pageNumber, pageSize)
    },
    async createNewPostForBlogger
        (
            bloggerId: number,
            title: string,
            shortDescription: string,
            content: string
        )
        {
            const newPostForBlogger = {
                id: +(new Date()),
                title: title,
                shortDescription: shortDescription,
                content: content,
                bloggerId: bloggerId
            }
            return await bloggersRepository.createPostForBlogger(newPostForBlogger)
        }
}


