import {bloggers, bloggersCollection} from "./db";

export const bloggersRepository = {
    async getBloggers() {
        return bloggersCollection.find().toArray()
    },
    async getBloggersById(id: number) {
        const blogger = bloggersCollection.findOne({id})
            if(blogger) {
                return blogger
            } else {
                return null
            }
    },
    async deleteBloggerById(id: number) {
        const delBlog = await bloggersCollection.deleteOne({id})
        return delBlog.deletedCount === 1
    },
    async updateBloggerById(id: number, name: string, youtubeUrl: string) {
        const updBlog = await bloggersCollection.updateOne(
            {id}, {$set: {name,youtubeUrl}})
        return updBlog.matchedCount === 1
    },
    async createBlogger(name: string, youtubeUrl: string) {
        const newBlogger = {
            id: +(new Date()),
            name: name,
            youtubeUrl: youtubeUrl
        }
        bloggers.push(newBlogger)
        return newBlogger
    }
}


