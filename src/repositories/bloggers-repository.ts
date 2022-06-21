import {Bloggers, bloggersCollection, Paginator, postsCollection, PostsCon} from "./db";
import * as MongoClient from 'mongodb';
import {IBloggersRepository} from "../domain/bloggers-service";


export class BloggersRepository implements IBloggersRepository {
    constructor(private bloggersCollection: MongoClient.Collection<Bloggers>,
                private postsCollection: MongoClient.Collection<PostsCon>) {

    }

    async getBloggers(page: number, pageSize: number, searchNameTerm: string) : Promise<Paginator<Bloggers[]>> {

        const filter = {name: {$regex: searchNameTerm ? searchNameTerm : ""}}
        const bloggers = await bloggersCollection
            .find(filter)
            .project<Bloggers>({_id: 0})
            .skip((page - 1) * pageSize)
            .limit(pageSize)
            .toArray()

        const count = await bloggersCollection.countDocuments(filter)
        const total = Math.ceil(count / pageSize)

        return ({
            pagesCount: total,
            page: page,
            pageSize: pageSize,
            totalCount: count,
            items: bloggers
        })

    }

    async getBloggersById(id: string) {
        return await bloggersCollection.findOne({id}, {projection: {_id: 0}})

    }

    async deleteBloggerById(id: string) {
        const delBlog = await bloggersCollection.deleteOne({id})
        return delBlog.deletedCount === 1
    }

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
    }

    async createBlogger(newBlogger: Bloggers) {
        await bloggersCollection.insertOne(newBlogger)
        return newBlogger
        console.log(newBlogger)
    }
}

