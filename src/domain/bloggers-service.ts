import {bloggersRepository} from "../repositories/bloggers-repository";
import {Bloggers, Paginator, PostsCon} from "../repositories/db";



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
    }
}


