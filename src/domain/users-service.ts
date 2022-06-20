import {v4} from "uuid";
import {Paginator, UserType} from "../repositories/db";
import {addHours} from "date-fns";
import {templateService} from "./email-service";
import {UsersRepository} from "../repositories/users-repo";
import {authService, emailService} from "../iocContainer";

export class UsersService {
    constructor(private usersRepository: UsersRepository) {
    }

    async getUsers(page: number, pageSize: number) {
        const users = await this.usersRepository.getUsers(page, pageSize)
        return users
    }

    async createUser(login: string, password: string, email: string) {
        const passwordHash = await authService._generateHash(password)
        const newUser: UserType = {
            accountData: {
                id: v4(),
                login: login,
                email: email,
                passwordHash,
                createdAt: new Date()
            },
            loginAttempts: [],
            emailConfirm: {
                sentEmails: [],
                confirmationCode: v4(),
                expirationDate: addHours(new Date(), 24),
                isConfirmed: false
            }
        }
        const createdUser = await this.usersRepository.createUser(newUser)
        if (createdUser) {
            const messageBody = templateService.getConfirmMessage(createdUser.emailConfirm.confirmationCode)
            await emailService.addMessageInQueue({
                email: newUser.accountData.email,
                message: messageBody,
                subject: "Confirm your email",
                isSent: false,
                createdAt: new Date()
            })
            return createdUser
        } else {
            return null
        }
    }

    async deleteUser(id: string) {
        return await this.usersRepository.delUser(id)
    }
}
export interface IUsersRepository {
    getUsers(page: number, pageSize: number): Promise<Paginator<UserType[]>>
    createUser(newUser: UserType): Promise<UserType | null>
    delUser(id: string): Promise<boolean>
}

