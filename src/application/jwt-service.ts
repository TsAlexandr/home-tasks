import jwt from 'jsonwebtoken'
import {ObjectId} from "mongodb";
import {settings} from "../settings";
import {Users} from "../repositories/db";



export const jwtService = {
    async createJWT(user: Users) {
        const token = jwt.sign({userId: user.id}, settings.JWT_SECRET, {expiresIn: '1h'})
        return token
    },
    async getUserIdByToken(token: string) {
        try {
            const result: any = jwt.verify(token, settings.JWT_SECRET)
            return new ObjectId(result.userId)
        } catch (error) {
            return null
        }
    }
}