
import { User } from '../models/userModel.js'
import bcrypt from 'bcrypt'


import { sendOTP } from './extras/otp.js'






export const registerUser = async (req, res) => {
    const { email, password, username } = req.body
    if (!email || !password || !username) {
        res.status(400)
        throw new Error('Please enter all the relavent fields')
    }

    // check kro k kahi mail  already registered to nahi ha

    let checkMail = await User.findOne({ email })
    let checkUserName = await User.findOne({ username })

    if (checkMail) {
        res.status(401)
        throw new Error('Email Already Exists!')
    }
    if (checkUserName) {
        res.status(401)
        throw new Error('Username Already Exists!')
    }


    let hashedPassword = await bcrypt.hash(password, 10)



    sendOTP(email)



    const createdUser = await User.create({
        email, password: hashedPassword, username
    })


    res.send(createdUser)



}

export const checkMail = async (req, res) => {
    const { email } = req.body
    if (!email) {
        res.status(401)
        throw new Error('Please enter a mail')

    }
    let isUser = await User.findOne({ email })

    if (isUser) {
        res.send('exists')
    } else {
        res.send('not exists')
    }


}