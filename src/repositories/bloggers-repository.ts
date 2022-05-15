import {Bloggers, bloggersCollection, postsCollection} from "./db";

export const bloggersRepository = {
    async getBloggers(page: number, pageSize: number, searchNameTerm: string) {
        const filter = {name: {$regex: searchNameTerm ? searchNameTerm: ""}}
        const bloggers = await bloggersCollection
            .find(filter)
            .project({_id: 0})
            .skip((page - 1) * pageSize)
            .limit(pageSize)
            .toArray()

        const count = await bloggersCollection.countDocuments(filter)
        const total = Math.ceil(count/pageSize)

        const bloggersInPage = {
            pagesCount: total,
            page: page,
            pageSize: pageSize,
            totalCount: count,
            items: bloggers
        }
        return bloggersInPage
    },
    async getBloggersById(id: string) {
        return await bloggersCollection.findOne({id}, {projection: {_id: 0}})

    },
    async deleteBloggerById(id: string) {
        const delBlog = await bloggersCollection.deleteOne({id})
        return delBlog.deletedCount === 1
    },
    async updateBloggerById(id: string, name: string, youtubeUrl: string) {
        const updBlog = await bloggersCollection.findOneAndUpdate(
            {id}, {
                $set: {
                    "name": name,
                    "youtubeUrl": youtubeUrl
                }
            })
        await postsCollection.updateMany
        ({bloggerId: id}, {$set: {'bloggerName': name}})
        return updBlog.value
    },
    async createBlogger(newBlogger: Bloggers) {
        await bloggersCollection.insertOne(newBlogger, {forceServerObjectId: true})
        return newBlogger
    }
}

