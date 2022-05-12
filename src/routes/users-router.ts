import {Router, Request, Response} from "express";
import {usersService} from "../domain/users-service";
import {authMiddleware} from "../middlewares/auth-middleware";
import {inputValidator} from "../middlewares/input-validator-middlewares";
import {getPageFor} from "./bloggers-router";

export const usersRouter = Router({})


usersRouter.get('/',
    inputValidator,
    authMiddleware,
    async (req: Request, res: Response) => {
    const {pageNumber, pageSize} = getPageFor(req.query)
    const users = usersService.getUsers(pageNumber,pageSize)
        if(!users) {
            res.sendStatus(400)
        } else {
            res.send(users)
        }
})
    .post('/',
        inputValidator,
        authMiddleware,
        async(req: Request, res: Response) => {
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

    .delete('/:id',
        inputValidator,
        authMiddleware,
        async (req: Request, res: Response) => {
        const id = req.body.ObjectId
        const delUser = await usersService.deleteUser(id)
            if(!delUser) {
                res.status(401)
            } else {
                res.status(204)
            }
    })