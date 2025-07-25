import express from 'express'
import { checkMail, registerUser } from '../controllers/userController.js'

export const userRouter = express.Router()



userRouter.post('/register-user', registerUser)
userRouter.post('/verify-mail', checkMail)