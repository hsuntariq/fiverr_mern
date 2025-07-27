import express from 'express'
import { checkMail, checkUserName, registerUser, verifyOTP } from '../controllers/userController.js'

export const userRouter = express.Router()



userRouter.post('/register-user', registerUser)
userRouter.post('/verify-mail', checkMail)
userRouter.post('/verify-username', checkUserName)
userRouter.post('/verify-otp/:id', verifyOTP)
