import {usersRepo} from "../repositories/users-repo";
import {usersCollection} from "../repositories/db";
import {authService} from "./auth-service";
import {v4} from "uuid";


export const usersService = {
    async getUsers(page: number, pageSize: number) {
        const users = await usersRepo.findUsers(page, pageSize)
        return users
    },

    async createUser(login: string, password: string) {
        const passwordHash = await authService._generateHash(password)
        const newUser = {
            id: v4(),
            login,
            password,
            passwordHash
        }
        const createdUser = await usersRepo.createUser(newUser)
        return createdUser
    },

    async deleteUser(id: string){
        const isDeleted = await usersCollection.deleteOne({id})
        return isDeleted.deletedCount === 1
    },
}
