import {bloggersRepository} from "../repositories/bloggers-repository";



export const bloggersService = {
    async getBloggers() {
        return await bloggersRepository.getBloggers()
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


