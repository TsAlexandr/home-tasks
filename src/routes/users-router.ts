import {Router, Request, Response} from "express";
import {
    getPage,
    inputValidator, isValidId, isValidPage,
    isValidUser
} from "../middlewares/input-validator-middlewares";
import {checkAuth} from "../middlewares/basic-auth";
import {usersService} from "../iocContainer";


export const usersRouter = Router({})


usersRouter.get('/',
    isValidPage,
    inputValidator,
    async (req: Request, res: Response) => {
        const {page, pageSize} = getPage(req.query)
        const users = await usersService.getUsers(page, pageSize)
        res.status(200).send(users)
    })

    .post('/',
        checkAuth,
        isValidUser,
        inputValidator,
        async (req: Request, res: Response) => {
            const {login, password, email} = req.body
            const newUser = await usersService.createUser(
                login,
                password,
                email
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
                res.status(404).send({
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