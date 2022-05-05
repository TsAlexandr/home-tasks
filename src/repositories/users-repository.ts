import {usersCollection} from "./db";

export const usersRepository = {
    findUserByLogin(login: string)
    {
        const user = usersCollection.findOne({login})
        return user
    }
}