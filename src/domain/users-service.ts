import {usersRepo} from "../repositories/users-repo";
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";
import {usersCollection} from "../repositories/db";
import {randomUUID} from "crypto";

export const usersService = {
    async getUsers(page: number, pageSize: number) {
        return await usersRepo.findUsers(page, pageSize)
    },

    async createUser(login: string, password: string) {
        const passwordSalt = await bcrypt.genSalt(10)
        const passwordHash = await this._generateHash(password, passwordSalt)

        const newUser = {
            id: randomUUID(),
            login,
            password: passwordHash && passwordSalt
        }
        return await usersRepo.createUser(newUser)
    },

    async findUserById(id: string){
      const user = await usersRepo.findById(id)
        return user
    },

    async deleteUser(id: string){
        const isDeleted = await usersCollection.deleteOne({id})
        return isDeleted.deletedCount === 1
    },

    async checkCredentials(login: string, password: string){
        const user = await usersRepo.findByLogin(login)
            if(!user) return false
        const passwordHash = await this._generateHash(password, user.passwordSalt)
            if(user.passwordHash !== passwordHash) {
                return false
            } else {
                const token = jwt.sign({userId: user.id}, 'secret', {expiresIn: '1h'})
            }

    },
    async _generateHash(password: string, salt: string) {
        const hash = await bcrypt.hash(password, salt)
        return hash
    },

}
