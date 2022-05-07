import {Bloggers, bloggersCollection, Paginator, postsCollection, PostsCon} from "./db";
import {postsRepository} from "./posts-repository";


export const bloggersRepository = {
    async getBloggers(name: string, pageSize: number, pageNumber: number) {
        const bloggers:Bloggers[] = await bloggersCollection
            .find({name: {$regex: name}}, {projection: {id: 0}})
            .limit(pageSize)
            .skip((pageNumber - 1) * pageSize)
            .toArray()

        const count = await bloggersCollection.countDocuments()
        const total = Math.ceil(count/pageSize)

        const bloggersInPage:Paginator<Bloggers> = {
            page: pageNumber,
            pageSize: pageSize,
            totalCount: total,
            pagesCount: count,
            items: bloggers
        }
        return bloggersInPage

    },
    async getBloggersById(id: number) {
        const bloggerById = await bloggersCollection.findOne({id})
        if (bloggerById) {
            return {
                id: bloggerById.id,
                name: bloggerById.name,
                youtubeUrl: bloggerById.youtubeUrl
            }
        } else {
            return false
        }
    },
    async deleteBloggerById(id: number) {
        const delBlog = await bloggersCollection.deleteOne({id})
        return delBlog.deletedCount === 1
    },
    async updateBloggerById(id: number, name: string, youtubeUrl: string) {
        const updBlog = await bloggersCollection.updateOne(
            {id}, {
                $set: {
                    "name": name,
                    "youtubeUrl": youtubeUrl
                }
            })
        return updBlog.matchedCount === 1
    },
    async createBlogger(newBlogger: Bloggers) {
        await bloggersCollection.insertOne(newBlogger)
        return {
            id: newBlogger.id,
            name: newBlogger.name,
            youtubeUrl: newBlogger.youtubeUrl
        }
    }
}

