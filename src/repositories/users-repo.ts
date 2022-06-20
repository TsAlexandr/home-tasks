import {Paginator, usersCollection, UserType} from "./db";
import {injectable} from "inversify";
import * as MongoClient from "mongodb";
import {IUsersRepository} from "../domain/users-service";
import {addHours} from "date-fns";
import {v4} from "uuid";


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

    async createUser(newUser: UserType): Promise<UserType> {
        const result = await this.usersCollection.insertOne(newUser)
        return newUser
    }

    async findByLogin(login: string) {
        const user = await this.usersCollection.findOne({"accountData.login": login})
        return user
    }

    async findById(id: string) {
        const user = await this.usersCollection.findOne({"accountData.id": id})
        return user
    }

    async delUser(id: string) {
        const result = await this.usersCollection.deleteOne({"accountData.id": id})
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
        let result = await this.usersCollection
            .updateOne({"accountData.id": id}, {$set: {"emailConfirm.isConfirmed": true}})
        return result.modifiedCount === 1
    }

    async updateConfirmationCode(id: string) {
        let updatedUser = await this.usersCollection
            .findOneAndUpdate({"accountData.id": id},
                {
                    $set: {
                        "emailConfirmation.confirmationCode": v4(),
                        "emailConfirmation.expirationDate": addHours(new Date(), 24)
                    }
                },
                {returnDocument: "after"})
        return updatedUser.value

    }

    async findExistingUser(login: string, email: string) {
        const result = await this.usersCollection
            .findOne({$or: [{"accountData.login": login}, {"accountData.email": email}]})
        return result
    }
}
