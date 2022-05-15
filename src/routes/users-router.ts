import {Router, Request, Response} from "express";
import {usersService} from "../domain/users-service";
import {
    getDataPage,
    inputValidator,
    isValidPage,
    isValidUser
} from "../middlewares/input-validator-middlewares";
import {checkAuth} from "../middlewares/basic-auth";


export const usersRouter = Router({})


usersRouter.get('/',
    isValidPage,
    inputValidator,
    async (req: Request, res: Response) => {
        const {page, pageSize, searchNameTerm} = getDataPage(req.query)
        const users = usersService.getUsers(page, pageSize, searchNameTerm)
        res.status(200).send(users)
    })

    .post('/',
        checkAuth,
        isValidUser,
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
            const userId = req.body.userId
            const delUser = await usersService.deleteUser(userId)
            if (!delUser) {
                res.sendStatus(404)
            } else {
                res.sendStatus(204)
            }
        })