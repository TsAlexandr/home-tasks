// import {Bloggers, bloggersCollection} from "./db";
//
// export const bloggersRepository = {
//     async getBloggers() {
//         return await bloggersCollection.find().toArray()
//     },
//     async getBloggersById(id: number) {
//         const blogger = await bloggersCollection.findOne({id})
//         if (blogger) {
//             return blogger
//         } else {
//             return null
//         }
//     },
//     async deleteBloggerById(id: number) {
//         const delBlog = await bloggersCollection.deleteOne({id})
//         return delBlog.deletedCount === 1
//     },
//     async updateBloggerById(id: number, name: string, youtubeUrl: string) {
//         const updBlog = await bloggersCollection.updateOne(
//             {id}, {$set: {"name": name, "youtubeUrl": youtubeUrl}})
//         return updBlog.matchedCount === 1
//     },
//     async createBlogger(newBlogger: Bloggers) {
//         return await bloggersCollection.insertOne(newBlogger)
//     }
//
// }

