import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import {usersRepository} from "../repositories/users-repository";

export const usersService = {

    async _generateHash(password: string, salt: string) {
        const hash = await bcrypt.hash(password, salt)
        return hash
    },
    async checkCredentials(login: string, password: string) {
        const user = await usersRepository.findUserByLogin(login)
        if (!user) return {
            resultCode: 1,
            data: {
                token: null
            }
        }
        const passwordHash = await this._generateHash(password, user.passwordSalt)
        const result = user.passwordHash === passwordHash
        if (result) {
            const token = jwt.sign({userId: user.id}, 'topSecretKey', {expiresIn: '1d'})
            return {
                resultCode: 0,
                data: {
                    token: token
                }
            }
        } else {
            return {
                resultCode: 1,
                data: {
                    token: null
                }
            }
        }
    }
}