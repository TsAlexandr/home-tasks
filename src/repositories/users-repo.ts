import {Users, usersCollection} from "./db";


export const usersRepo = {
    async getUsers(page: number, pageSize: number) {
        const user = await usersCollection
            .find({})
            .skip((page - 1) * pageSize)
            .limit(pageSize)
            .toArray()
        const total = await usersCollection.countDocuments({})
        const pages = Math.ceil(total / pageSize)

        const userInPages = {
            pagesCount: pages,
            page: page,
            pageSize: pageSize,
            totalCount: total,
            items: user
        }
        return userInPages
    },

    async createUser(newUser: Users) {
        await usersCollection.insertOne(newUser)
        const createUser = await usersCollection.findOne({id: newUser.id})
        return ({
            id: createUser?.id,
            login: createUser?.login
        })
    },

    async findByLogin(login: string) {
        const user = await usersCollection.findOne({login})
        return user
    },

    async findById(id: string) {
        const user = await usersCollection.findOne({id})
        return user
    },

    async deleteOne(id: string) {
        const result = await usersCollection.deleteOne({id})
        return result.deletedCount === 1
    }
}