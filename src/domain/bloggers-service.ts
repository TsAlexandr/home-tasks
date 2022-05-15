import {bloggersRepository} from "../repositories/bloggers-repository";
import {randomUUID} from "crypto";


export const bloggersService = {
    async getBloggers(page: number, pageSize: number, searchNameTerm: string) {
        return await bloggersRepository.getBloggers(page, pageSize, searchNameTerm)
    },
    async getBloggersById(id: string) {
        return await bloggersRepository.getBloggersById(id)
    },
    async deleteBloggerById(id: string) {
        return  await bloggersRepository.deleteBloggerById(id)
    },
    async updateBloggerById(id: string, name: string, youtubeUrl: string) {
        return await bloggersRepository.updateBloggerById(id, name, youtubeUrl)
    },
    async createBlogger(name: string, youtubeUrl: string) {
        const newBlogger = {
            id: randomUUID(),
            name: name,
            youtubeUrl: youtubeUrl
        }
        return await bloggersRepository.createBlogger(newBlogger)
    }
}


