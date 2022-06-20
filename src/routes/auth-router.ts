import {Router, Request, Response} from "express";
import {attemptsControl, authService, usersService} from "../iocContainer";
import {
    inputValidator,
    isValidCode,
    isValidEmail,
    isValidUser, validInput
} from "../middlewares/input-validator-middlewares";


export const authRouter = Router({})

authRouter.post('/login',
    isValidUser,
    inputValidator,
    attemptsControl.checkAttempts.bind(attemptsControl),
    async (req: Request, res: Response) => {
    const {login, password} = req.body
    const result = await authService.checkCredentials(login, password)
    if (result.resultCode === 0) {
        res.status(200).send(result.data)
    } else {
        res.sendStatus(401)
    }
})

authRouter.post('/registration',
    validInput,
    inputValidator,
    attemptsControl.checkAttempts.bind(attemptsControl),
    attemptsControl.checkExisting.bind(attemptsControl),
    async (req: Request, res: Response) => {
    const {login, email, password} = req.body
    const user = await usersService.createUser(login, password, email)
    if (!user) {
        res.sendStatus(400)
    } else {
        res.sendStatus(204)
        console.log(user)
    }

})

authRouter.post('/registration-confirmation',
    isValidCode,
    inputValidator,
    attemptsControl.checkAttempts.bind(attemptsControl),
    async (req: Request, res: Response) => {
    const code = req.body.code
    const result = await authService.confirmEmail(code)
    if (!result) {
        res.status(400).send({
            errorsMessages: [{message: "wrong code", field: "code"}]
        })
    } else {
        res.sendStatus(204)
    }
})

authRouter.post('/registration-email-resending',
    isValidEmail,
    inputValidator,
    attemptsControl.checkAttempts.bind(attemptsControl),
    async (req: Request, res: Response) => {
    const result = await authService.resendRegistrationCode(req.body.email)
    if (!result) {
        res.status(400)
            .send({
                errorsMessages: [{
                    message: "invalid email",
                    field: "email"
                }]
            })
    } else {
        res.sendStatus(204)
    }
})