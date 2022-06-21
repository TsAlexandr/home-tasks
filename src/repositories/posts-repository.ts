import {Bloggers, Paginator, postsCollection, PostsCon} from "./db";
import {injectable} from "inversify";
import * as MongoClient from 'mongodb';
import {BloggersRepository} from "./bloggers-repository";
import {IPostsRepository} from "../domain/posts-service";


@injectable()
export class PostsRepository implements IPostsRepository {
    constructor(private postsCollection: MongoClient.Collection<PostsCon>,
                private bloggersCollection: MongoClient.Collection<Bloggers>,
                private bloggersRepository: BloggersRepository) {
    }
    async getPosts(page: number, pageSize: number) {
        const post: PostsCon[] = await postsCollection
            .find({}, {projection: {_id: 0}})
            .limit(pageSize)
            .skip((page - 1) * pageSize)
            .toArray()
        const total = await postsCollection.countDocuments({})
        const pages = Math.ceil(total / pageSize)

        return ({
            pagesCount: pages,
            page: page,
            pageSize: pageSize,
            totalCount: total,
            items: post
        })
    }
    async getPostsById(id: string) {
        const post = await this.postsCollection.findOne({id}, {projection: {_id: 0}})
        if (!post) return false
        const blogger = await this.bloggersRepository.getBloggersById(post.bloggerId)
        if (!blogger) return false
        const bloggerName = blogger.name
        return ({
            id: post.id,
            title: post.title,
            shortDescription: post.shortDescription,
            content: post.content,
            bloggerId: post.bloggerId,
            bloggerName
        })

    }
    async deletePostsById(id: string) {
        const delPost = await postsCollection.deleteOne({id})
        return delPost.deletedCount === 1
    }
    async updatePostsById(updatePost: PostsCon) {
        const id = updatePost.id
        const updPosts = await postsCollection.updateOne({id}, {$set: {...updatePost}}, {upsert: true})
        return updPosts.modifiedCount === 1
    }
    async createPosts(createPost: PostsCon): Promise<PostsCon | null> {
        const blogger = await this.bloggersCollection.findOne({id: createPost.bloggerId})
        if (!blogger) return null
        await postsCollection.insertOne({...createPost, bloggerName: blogger.name})
        const post = await postsCollection.findOne({id: createPost.id}, {projection: {_id: 0}})
        return post
        console.log(post)
    }
    async getPostInPages(bloggerId: string, page: number, pageSize: number) {
        const postsByBloggerId = await postsCollection
            .find({bloggerId}, {projection: {_id: 0}})
            .limit(page)
            .skip((pageSize - 1) * page)
            .toArray()
        const total = await postsCollection.countDocuments({bloggerId})
        const pages = Math.ceil(total / page)

        return ({
            pagesCount: pages,
            page: pageSize,
            pageSize: page,
            totalCount: total,
            items: postsByBloggerId
        })
    }
}