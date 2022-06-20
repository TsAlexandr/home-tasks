import {injectable} from "inversify";
import * as MongoClient from "mongodb";
import {attemptsType} from "./db";
import {IAttemptsRepository} from "../middlewares/attempts-control";


@injectable()
export class AttemptsRepository implements IAttemptsRepository {
    constructor(private attemptsCollection: MongoClient.Collection<attemptsType>) {
    }

    async addAttempt(ip: string, url: string, time: Date) {
        let result = await this.attemptsCollection.insertOne({
            userIp: ip,
            url,
            time
        })
        return result.insertedId
    }

    async removeOldAttempts() {
        let result = await this.attemptsCollection.deleteMany({})
        return result.deletedCount
    }

    async getLastAttempts(ip: string, url: string, limitTime: Date) {
        const count = await this.attemptsCollection.countDocuments({
            userIp: ip,
            url,
            time: {$gt: limitTime}
        })
        return count
    }
}