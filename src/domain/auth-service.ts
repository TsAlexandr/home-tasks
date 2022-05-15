import {usersRepo} from "../repositories/users-repo";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import {BaseAuthData} from "../repositories/db";


export const authService = {
    async checkCredentials(login: string, password: string){
        const user: any = await usersRepo.findByLogin(login)
        if(!user) return false
        const passwordHash = await this._correctHash(password, user.passwordHash)
        if(!passwordHash) {
            return false
        } else {
            const token = jwt.sign({userId: user.id}, 'secret', {expiresIn: '1d'})
        }

    },
    async _generateHash(password: string) {
        const hash = await bcrypt.hash(password, 10)
        return hash
    },
    async _correctHash(password: string, hash: string) {
        const equal = await bcrypt.compare(password, hash)
        return equal
    },
    decodeBaseAuth(token: string): BaseAuthData {
        const buff = Buffer.from(token, "base64");

        const decodedString = buff.toString("ascii");

        const loginAndPassword = decodedString.split(":");
        return {
            login: loginAndPassword[0],
            password: loginAndPassword[1],
        };
    }
}