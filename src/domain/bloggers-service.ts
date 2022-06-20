import {v4} from "uuid";
import {bloggersRepository} from "../iocContainer";
import {BloggersRepository} from "../repositories/bloggers-repository";
import {inject, injectable} from "inversify";
import {TYPES} from "../TYPES";
import {Bloggers, Paginator} from "../repositories/db";

@injectable()
export class BloggersService {
    constructor(@inject<IBloggersRepository>(TYPES.IBloggersRepository) private bloggersRepository: BloggersRepository) {
    }


    async getBloggers(page: number, pageSize: number, searchNameTerm: string) {
        return await bloggersRepository.getBloggers(page, pageSize, searchNameTerm)
    }

    async getBloggersById(id: string) {
        return await bloggersRepository.getBloggersById(id)
    }

    async deleteBloggerById(id: string) {
        return await bloggersRepository.deleteBloggerById(id)
    }

    async updateBloggerById(id: string, name: string, youtubeUrl: string) {
        return await bloggersRepository.updateBloggerById(id, name, youtubeUrl)
    }

    async createBlogger(name: string, youtubeUrl: string) {
        const newBlogger = {
            id: v4(),
            name: name,
            youtubeUrl: youtubeUrl
        }
        return await bloggersRepository.createBlogger(newBlogger)
    }
}

export interface IBloggersRepository {
    getBloggers(page: number, pageSize: number, searchNameTerm: string): Promise<Paginator<Bloggers[]>>
    getBloggersById(id: string): Promise<Bloggers | null>
    deleteBloggerById(id: string): Promise<boolean>
    updateBloggerById(id: string, name: string, youtubeUrl: string): Promise<Bloggers | null>
    createBlogger(newBlogger: Bloggers): Promise<Bloggers>
}



