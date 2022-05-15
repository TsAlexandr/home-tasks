import {usersRepo} from "../repositories/users-repo";
import {usersCollection} from "../repositories/db";
import {randomUUID} from "crypto";
import {authService} from "./auth-service";

export const usersService = {
    async getUsers(page: number, pageSize: number) {
        return await usersRepo.findUsers(page, pageSize)
    },

    async createUser(login: string, password: string) {
        const passwordHash = await authService._generateHash(password)
        const newUser = {
            id: randomUUID(),
            login,
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
