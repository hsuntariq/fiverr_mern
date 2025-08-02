import express, { Router } from "express"
import { checkMail, checkSignInPass, checkUserName, registerUsers, resendOTP, sendResetLink, verifyOtp } from "../Controller/registerUserController.js";


export const usersRouter = express.Router();




usersRouter.post('/register-user', registerUsers)
usersRouter.post('/verify-mail', checkMail)
usersRouter.post('/verify-UserName', checkUserName)
usersRouter.post('/verify-otp/:id', verifyOtp)
usersRouter.post('/verify-SignInPass/:id', checkSignInPass)
usersRouter.post('/resend-otp/:user_id', resendOTP)
usersRouter.post('/reset-password-link', sendResetLink)
