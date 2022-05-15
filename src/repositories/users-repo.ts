import {Paginator, Users, usersCollection} from "./db";


export const usersRepo = {
    async findUsers(page: number, pageSize: number) {
        const user:Users[] = await usersCollection
            .find({}, {projection: {_id:0, passwordHash: 0}})
            .limit(pageSize)
            .skip((page - 1) * pageSize)
            .toArray()
        const total = await usersCollection.countDocuments({})
        const pages = Math.ceil(total / pageSize)

        const userInPages:Paginator<Users> = {
            pagesCount: pages,
            page: page,
            pageSize: pageSize,
            totalCount: total,
            items: user
        }
        return userInPages
    },

    async createUser(newUser: Users) {
        await usersCollection.insertOne(newUser, {forceServerObjectId: true})
        return await usersCollection.findOne(
            {id: newUser.id},
            {projection: {_id: false, password: false}})
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