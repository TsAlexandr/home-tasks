import {bloggers} from "./db";

export const bloggersRepository = {
    getBloggers() {
        return bloggers
    },
    getPostsById(id: number) {
        return bloggers.find(p => p.id === id)
    },
    deletePostsById(id: number) {
        return bloggers.findIndex(delBlog => delBlog.id != id)
    },
    updatePostsById(id: number) {
        return bloggers.find(b => b.id === id)
    },
    createPosts(name: string, youtubeUrl: string) {
        const newBlogger = {
            id: +(new Date()),
            name: name,
            youtubeUrl: youtubeUrl
        }
        bloggers.push(newBlogger)
        return newBlogger
    }
}


