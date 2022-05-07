// import {usersRepo} from "../repositories/users-repo";
// import bcrypt from 'bcrypt'
// import {ObjectId} from "mongodb";
// import jwt from "jsonwebtoken";
//
// export const usersService = {
//     async getUsers(pageNumber: number, pageSize: number) {
//         return await usersRepo.findUsers(pageNumber, pageSize)
//     },
//
//     async createUser(login: string, password: string) {
//         const passwordSalt = await bcrypt.genSalt(10)
//         const passwordHash = await this._generateHash(password, passwordSalt)
//
//         const newUser = {
//             id: new ObjectId(),
//             login,
//             passwordSalt,
//             passwordHash
//         }
//         return await usersRepo.createUser(newUser)
//     },
//
//     async findUserById(id: ObjectId){
//       const user = await usersRepo.findById(id)
//         return user
//     },
//
//     async checkCredentials(login: string, password: string){
//         const user = await usersRepo.findByLogin(login)
//             if(!user) return false
//         const passwordHash = await this._generateHash(password, user.passwordSalt)
//             if(user.passwordHash !== passwordHash) {
//                 return false
//             } else {
//                 const token = jwt.sign({userId: user.id}, 'secret', {expiresIn: '1h'})
//             }
//
//     },
//     async _generateHash(password: string, salt: string) {
//         const hash = await bcrypt.hash(password, salt)
//         return hash
//     },
//
// }
