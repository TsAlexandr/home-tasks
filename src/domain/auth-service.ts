import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import {BaseAuthData} from "../repositories/db";
import {isAfter} from "date-fns";
import {EmailService, templateService} from "./email-service";
import {usersRepository} from "../iocContainer";


export class AuthService {
    constructor(private emailService: EmailService) {

    }
    async checkCredentials(login: string, password: string) {
        const user: any = await usersRepository.findByLogin(login)
        if (!user || !user.emailConfirm.isConfirmed) return {
            resultCode: 1,
            data: {
                token: null
            }
        }
        const isItHash = await this._correctHash(password, user.accountData.passwordHash)
        if (!isItHash) {
            return {
                resultCode: 1,
                data: {
                    token: null
                }
            }
        } else {
            const token = jwt.sign({userId: user.accountData.id}, 'secret', {expiresIn: '1d'})
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
        if(!user) return null
        const updUser = await usersRepository.updateConfirmationCode(user.accountData.id)
        console.log(updUser)
        if(updUser) {
            const message = templateService.getConfirmMessage(updUser.emailConfirm.confirmationCode)
            console.log(message)
            await this.emailService.sendEmail(user.accountData.email, "Confirm your email", message)
            return true
        }
        return null
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
}

