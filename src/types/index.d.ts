import {Users} from "../repositories/db";

declare global {
    declare namespace Express {
        export interface Request {
            user: Users | null
            login: string
        }
    }
}