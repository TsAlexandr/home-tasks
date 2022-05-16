import {usersRepo} from "../repositories/users-repo";
import {Users, usersCollection} from "../repositories/db";
import {authService} from "./auth-service";
import {v4} from "uuid";


export const usersService = {
    async getUsers(page: number, pageSize: number) {
        const users = await usersRepo.getUsers(page, pageSize)
        return users
    },

    async createUser(login: string, password: string) {
        const passwordHash = await authService._generateHash(password)
        const newUser = {
            id: v4(),
            login,
            passwordHash
        }
        const createdUser = await usersRepo.createUser(newUser)
        return createdUser
    },

    async deleteUser(id: string){
        return await usersRepo.delUser(id)
    },
}
