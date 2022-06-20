import {injectable} from "inversify";
import * as MongoClient from 'mongodb';
import {EmailConfirmType, emailType} from "./db";
import {ObjectId} from "mongodb";


@injectable()
export class NotificationRepo {
    constructor(private enqueueMessageCollection: MongoClient.Collection<emailType>) {
    }
    async enqueueMessage(message: emailType) {
        const result = await this.enqueueMessageCollection.insertOne(message)
        return result.insertedId
    }
    async dequeueMessage() {
        const message = await this.enqueueMessageCollection.findOne({isSent: false})
        return message
    }
    async updateMessage(id: ObjectId) {
        const result = await this.enqueueMessageCollection.updateOne({_id: id}, {$set: {isSent: true}})
        return result.modifiedCount === 1
    }
}