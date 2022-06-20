import {Paginator, usersCollection, UserType} from "./db";
import {injectable} from "inversify";
import * as MongoClient from "mongodb";
import {v4} from "uuid";
import {addHours} from "date-fns";
import {IUsersRepository} from "../domain/users-service";


@injectable()
export class UsersRepository implements IUsersRepository {
    constructor(private usersCollection: MongoClient.Collection<UserType>) {
    }

    async getUsers(page: number, pageSize: number): Promise<Paginator<UserType[]>> {
        const user = await this.usersCollection
            .find({}, {projection: {_id: 0, passwordHash: false}})
            .limit(pageSize)
            .skip((page - 1) * pageSize)
            .toArray()
        const total = await usersCollection.countDocuments({})
        const pages = Math.ceil(total / pageSize)

        return ({
            pagesCount: pages,
            page: page,
            pageSize: pageSize,
            totalCount: total,
            items: user
        })
    }

    async createUser(newUser: UserType): Promise<UserType | null> {
        await this.usersCollection.insertOne(newUser)
        const createdUser = await this.usersCollection.findOne({"accountData.id": newUser.accountData.id})
        return createdUser
            ? createdUser
            : null
    }

    async findByLogin(login: string) {
        const user = await this.usersCollection.findOne({login})
        return user
    }

    async findById(id: string) {
        const user = await this.usersCollection.findOne({id})
        return user
    }

    async delUser(id: string) {
        const result = await this.usersCollection.deleteOne({id})
        return result.deletedCount === 1
    }
    async findByEmail(email: string) {
        const user = await this.usersCollection.findOne({"accountData.email": email})
        return user
    }
    async findByConfirmCode(code: string) {
        const user = await this.usersCollection.findOne({"emailConfirm.confirmationCode": code})
        return user
    }
    async updateConfirm(id: string) {
        const result = await this.usersCollection.findOneAndUpdate(
            {id}, {
                $set: {
                    "emailConfirm.isConfirmed": true
                }
            })
        return result.value
    }
    async updateConfirmCode(id: string) {
        let update = await this.usersCollection.findOneAndUpdate({
        'accountData.id': id}, {
            $set: {
                "emailConfirm.confirmationCode": v4(),
                "emailConfirm.expirationDate": addHours(new Date(), 24)
            }
        }, {returnDocument: 'after'})
        return update.value
    }
    async findExistingUser(login: string, email: string) {
        const user = await this.usersCollection.findOne({
            $or: [{'accountData.login': login}, {'accountData.email': email}]
        })
        return user
    }
}