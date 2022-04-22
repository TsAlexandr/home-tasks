import {usersRepo} from "../repositories/users-repo";
import bcrypt from 'bcrypt'


export const usersService = {
    async getUsers(pageNumber: number, pageSize: number) {
        return await usersRepo.findUsers(pageNumber, pageSize)
    },

    async createUser(username: string, password: string) {
        const passwordSalt = await bcrypt.genSalt(10)
        const passwordHash = await this._generateHash(password, passwordSalt)

        const newUser = {
            id: +(new Date()),
            username: username,
            passwordSalt,
            passwordHash
        }
        return await usersRepo.createUser(newUser)
    },
    async checkCredentials(loginOrEmail: string, password: string){
        const user = await usersRepo.findByLoginOrEmail(loginOrEmail)
            if(!user) return false
        const passwordHash = await this._generateHash(password, user.passwordSalt)
            if(user.passwordHash !== passwordHash) {
                return false
            }
            return true
    },
    async _generateHash(password: string, salt: string) {
        const hash = await bcrypt.hash(password, salt)
        return hash
    },

}
