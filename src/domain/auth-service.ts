import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import {BaseAuthData} from "../repositories/db";
import {ObjectId} from "mongodb";
import {v4} from "uuid";
import add from 'date-fns/add'
import {injectable} from "inversify";
import {isAfter} from "date-fns";
import {EmailService, templateService} from "./email-service";
import {emailService, usersRepository} from "../iocContainer";

@injectable()
export class AuthService {

    async checkCredentials(login: string, password: string) {
        const user: any = await usersRepository.findByLogin(login)
        if (!user) return {
            resultCode: 1,
            data: {
                token: null
            }
        }
        const isItHash = await this._correctHash(password, user.passwordHash)
        if (!isItHash) {
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

    }
    async _generateHash(password: string) {
        const hash = await bcrypt.hash(password, 10)
        return hash
    }
    async _correctHash(password: string, hash: string) {
        const equal = await bcrypt.compare(password, hash)
        return equal
    }
    decodeBaseAuth(token: string): BaseAuthData {
        const buff = Buffer.from(token, "base64");

        const decodedString = buff.toString("ascii");

        const loginAndPassword = decodedString.split(":");
        return {
            login: loginAndPassword[0],
            password: loginAndPassword[1],
        };
    }
    async confirmEmail(code:string) {
        let user = await usersRepository.findByConfirmCode(code)
        if(!user) return false
        const dbConfirmCode = user.emailConfirm.confirmationCode
        const expired = isAfter(user.emailConfirm.expirationDate, new Date())
        if(dbConfirmCode === code && expired) {
            const result = await usersRepository.updateConfirm(user.accountData.id)
            return result
        }
        return false
    }
    async resendRegistrationCode(email:string) {
        let user = await usersRepository.findByEmail(email)
        if(!user) return false
        const updUser = await usersRepository.updateConfirm(user.accountData.id)
        if(updUser) {
            const message = templateService.getConfirmMessage(updUser.emailConfirm.confirmationCode)
            await emailService.addMessageInQueue({
                email: updUser.accountData.email,
                message: message,
                subject: 'Confirm your email',
                isSent: false,
                createdAt: new Date()
            })
            return true
        }
        return false
    }
}

