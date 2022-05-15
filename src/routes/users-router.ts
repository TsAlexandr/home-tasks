import {Router, Request, Response} from "express";
import {usersService} from "../domain/users-service";
import {authMiddleware} from "../middlewares/auth-middleware";
import {getPage, inputValidator} from "../middlewares/input-validator-middlewares";


export const usersRouter = Router({})


usersRouter.get('/',
    inputValidator,
    async (req: Request, res: Response) => {
        const {page, pageSize} = getPage(req.query)
        const users = usersService.getUsers(page, pageSize)
        res.status(200).send(users)
    })

    .get('/:id', inputValidator,
    async (req: Request, res: Response) => {
        const id = req.params.id
        const user = await usersService.findUserById(id)

    })

    .post('/',
        inputValidator,
        authMiddleware,
        async (req: Request, res: Response) => {
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
            if (!delUser) {
                res.status(401)
            } else {
                res.status(204)
            }
        })