import {Bloggers, bloggersCollection, Paginator, userInput, Users, usersCollection} from "./db";


export const usersRepo = {
    async findUsers(pageNumber: number, pageSize: number) {
        const user:Users[] = await usersCollection
            .find({},)
            .limit(pageSize)
            .skip((pageNumber - 1) * pageSize)
            .toArray()
        const count = await usersCollection.countDocuments()
        const total = Math.ceil(count / pageSize)

        const userInPages:Paginator<Users> = {
            page: pageNumber,
            pageSize: pageSize,
            totalCount: total,
            pagesCount: count,
            items: user
        }
        return userInPages
    },

    async createUser(newUser: Users) {
        await usersCollection.insertOne(newUser)
        return {
            id: newUser.id,
            login: newUser.login
        }
    },

    async findByLoginOrEmail(loginOrEmail: string) {
        const user = await usersCollection.findOne({$or: [{email: loginOrEmail}, {username: loginOrEmail}]})
        return user
    }
}