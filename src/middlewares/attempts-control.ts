import {injectable} from "inversify";
import {NextFunction, Request, Response} from "express";
import {usersRepository} from "../iocContainer";
import {AttemptsRepository} from "../repositories/attempts-repository";
import {ObjectId} from "mongodb";


@injectable()
export class AttemptsControlMiddleware {
    constructor(private attemptsRepository: AttemptsRepository) {
    }
    private attemptsInteval = 10 * 1000

    async checkAttempts(req: Request, res: Response, next: NextFunction) {
        const ip = req.ip
        const url = req.url
        const currentTime: Date = new Date()
        const attemptsTime = new Date(currentTime.getTime() - this.attemptsInteval)
        const attemptsCount = await this.attemptsRepository.getLastAttempts(ip, url, attemptsTime)
        await this.attemptsRepository.addAttempt(ip, url, currentTime)
        if(attemptsCount < 5) {
            next()
        } else {
            res.sendStatus(429)
        }
    }

    async checkExisting(req: Request, res: Response, next: NextFunction) {
        const login = req.body.login
        const email = req.body.email
        const errors = []
        const userEmail = await usersRepository.findByEmail(email)
        const userLogin = await usersRepository.findByLogin(login)
        if(userEmail) errors.push({message: 'email is already exist', field: "email"})
        if(userLogin) errors.push({message: 'login is already exist', field: "login"})
        if(errors.length < 1) return next()
        res.status(400).send({"errorsMessages": errors})

    }
}


export interface IAttemptsRepository {
    addAttempt(ip: string, url: string, time: Date): Promise<ObjectId>
    removeOldAttempts(): Promise<number>
    getLastAttempts(ip: string, url: string, limitTime: Date): Promise<number>
}
