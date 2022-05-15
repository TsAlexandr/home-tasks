import {Router, Request, Response} from "express";
import {usersService} from "../domain/users-service";
import {
    getDataPage, getPage,
    inputValidator,
    isValidPage,
    isValidUser
} from "../middlewares/input-validator-middlewares";
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
        inputValidator,
        async (req: Request, res: Response) => {
        const {login, password} = req.body
            const newUser = await usersService.createUser(
                login,
                password
            )
            res.status(201).send(newUser)

        })

    .delete('/:userId',
        checkAuth,
        inputValidator,
        async (req: Request, res: Response) => {
            const userId = req.params.userId
            const delUser = await usersService.deleteUser(userId)
            if (!delUser) {
                res.sendStatus(404)
            } else {
                res.sendStatus(204)
            }
        })