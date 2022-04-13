import {posts} from "./db";

export const postsRepository = {
    async getPosts() {
        return posts
    },
    async getPostsById(id: number) {
        return posts.find(p => p.id === id)
    },
    async deletePostsById(id: number) {
        for (let i = 0; i < posts.length; i++) {
            if (posts[i].id === id) {
                posts.splice(i, 1)
                return true
            }
        }
        return false
    },
    async updatePostsById(id: number, title: string, content: string, shortDescription: string) {
        let updPost = posts.find(post => post.bloggerId === id)
        if (updPost) {
            updPost.title = title
            updPost.content = content
            updPost.shortDescription = shortDescription
            return true
        } else {
            return false
        }
    },
    async createPosts(
        title : string,
        shortDescription: string,
        content: string,
        bloggerName: string
    ) {
        const newPost = {
            id: +(new Date()),
            title: title,
            shortDescription: shortDescription,
            content: content,
            bloggerName: bloggerName
        }
        posts.push(newPost)
        return newPost
    }
}