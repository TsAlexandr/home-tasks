import {Bloggers, bloggersCollection} from "./db";

export const bloggersRepository = {
    async getBloggers() {
        const bloggers = await bloggersCollection
            .find()
            .toArray()
        return bloggers
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

