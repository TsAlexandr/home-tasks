import {Paginator, Users, usersCollection} from "./db";


export const usersRepo = {
    async findUsers(page: number, pageSize: number) {
        const user:Users[] = await usersCollection
            .find({},)
            .limit(pageSize)
            .skip((page - 1) * pageSize)
            .toArray()
        const count = await usersCollection.countDocuments()
        const total = Math.ceil(count / pageSize)

        const userInPages:Paginator<Users> = {
            pagesCount: count,
            page: page,
            pageSize: pageSize,
            totalCount: total,
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

    async findByLogin(login: string) {
        const user = await usersCollection.findOne({login})
        return user
    },

    async findById(id: string) {
        const user = await usersCollection.findOne({id}, {projection: {_id:0}})
        return user
    }
}