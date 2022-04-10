import {posts} from "./db";

export const postsRepository = {
    getPosts() {
        return posts
    },
    getPostsById(id: number) {
        return posts.find(p => p.id === id)
    },
    deletePostsById: function(id: number) {
        return posts.findIndex(delPost => delPost.bloggerId === id)
    },
    updatePostsById(id: number) {
        return posts.find(post => post.bloggerId === id)
    },
    createPosts(
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