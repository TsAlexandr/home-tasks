import {posts} from "./db";

export const postsRepository = {
    getPosts() {
        return posts
    },
    getPostsById(id: number) {
        return posts.find(p => p.bloggerId === id)
    },
    deletePostsById: function(id: number) {

    },
    updatePostsById(id: number, title: string) {

    },
    createPosts(
        id: number,
        title : string,
        shortDescription: string,
        content: string,
        bloggerName: string
    ) {
        const newPost = {
            bloggerId: id,
            title: title,
            shortDescription: shortDescription,
            content: content,
            bloggerName: bloggerName
        }
        posts.push(newPost)
        return newPost
    }
}