import {Router} from "express";
import {usersService} from "../domain/users-service";
import {bloggersService} from "../domain/bloggers-service";

export const usersRouter = Router({})


usersRouter.get('/', (req, res) => {
    // @ts-ignore
    const pageSize = parseInt(req.query.pageSize)
    // @ts-ignore
    const pageNumber = parseInt(req.query.pageNumber)
    const users = usersService.getUsers(pageNumber,pageSize)
        if(!users) {
            res.sendStatus(400)
        } else {
            res.send(users)
        }
})
    .post('/', async(req, res) => {
        const newUser = await usersService.createUser(
            req.body.username,
            req.body.password
        )
        if (newUser) {
            res.status(201).send(newUser)
        } else {
            res.status(400)

        }
    })