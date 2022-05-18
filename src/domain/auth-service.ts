import {usersRepo} from "../repositories/users-repo";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import {BaseAuthData} from "../repositories/db";
import {ObjectId} from "mongodb";
import {v4} from "uuid";
import add from 'date-fns/add'


export const authService = {
    async checkCredentials(login: string, password: string){
        const user: any = await usersRepo.findByLogin(login)
        if(!user) return {
            resultCode: 1,
            data: {
                token: null
            }
        }
        const isItHash = await this._correctHash(password, user.passwordHash)
        if(!isItHash) {
            return {
                resultCode: 1,
                data: {
                    token: null
                }
            }
        } else {
            const token = jwt.sign({userId: user.id}, 'secret', {expiresIn: '1d'})
            return {
                resultCode: 0,
                data: {
                    token: token
                }
            }
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
    },
    async createUser(login: string, email: string, password: string) {
        const passwordHash = await this._generateHash(password)
        const user: UserAccountType = {
            _id: new ObjectId(),
            accountData: {
                username: login,
                email,
                passwordHash,
                createdAt: new Date()
            },
            emailConfirm: {
                confirmationCode: v4(),
                expirationData: add(new Date(), {
                    hours: 1
                }),
                isConfirmed: false
            }
        }
        const createResult = usersRepo.createUser(user)
        await emailManager.sendEmailConfirmationMessage(user)
        return createResult
    },
    async confirmEmail(login:string) {
        let user = await usersRepo.findByLogin(login)
        if(!user) return false
    }
}