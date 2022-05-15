import {Router, Request, Response} from "express";
import {usersService} from "../domain/users-service";
import {authMiddleware} from "../middlewares/auth-middleware";
import {getPage, inputValidator, isValidUser} from "../middlewares/input-validator-middlewares";
import {checkAuth} from "../middlewares/basic-auth";


export const usersRouter = Router({})


usersRouter.get('/',
    inputValidator,
    async (req: Request, res: Response) => {
        const {page, pageSize} = getPage(req.query)
        const users = usersService.getUsers(page, pageSize)
        res.status(200).send(users)
    })

    .post('/',
        checkAuth,
        isValidUser,
        inputValidator,
        async (req: Request, res: Response) => {
            const newUser = await usersService.createUser(
                req.body.login,
                req.body.password
            )
            if (newUser) {
                res.status(201).send(newUser)
            } else {
                res.sendStatus(400)
            }
        })

    .delete('/:userId',
        checkAuth,
        inputValidator,
        async (req: Request, res: Response) => {
            const userId = req.body.userId
            const delUser = await usersService.deleteUser(userId)
            if (!delUser) {
                res.sendStatus(404)
            } else {
                res.sendStatus(204)
            }
        })