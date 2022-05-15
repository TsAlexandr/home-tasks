import {Router, Request, Response} from "express";
import {usersService} from "../domain/users-service";
import {
    getDataPage, getPage,
    inputValidator,
    isValidUser
} from "../middlewares/input-validator-middlewares";
import {checkAuth} from "../middlewares/basic-auth";


export const usersRouter = Router({})


usersRouter.get('/',
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
            const userId = req.params.userId
            const delUser = await usersService.deleteUser(userId)
            if (!delUser) {
                res.sendStatus(404).send({
                    "data": {},
                    "errorsMessages": [{
                        message: "blogger not found",
                        field: "id"
                    }],
                    "resultCode": 0
                })
                return
            } else {
                res.send(204)
            }
        })