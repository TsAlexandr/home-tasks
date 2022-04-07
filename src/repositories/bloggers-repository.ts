import {bloggers} from "./db";

export const bloggersRepository = {
    getBloggers() {
        return bloggers
    },
    getPostsById(id: number) {
        return bloggers.find(p => p.id === id)
    },
    deletePostsById(id: number) {

    },
    updatePostsById(id: number, title: string) {

    },
    createPosts(title: string, youtubeUrl: string) {

    }
}


