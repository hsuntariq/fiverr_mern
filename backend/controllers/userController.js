
import { User } from '../models/userModel.js'
import bcrypt from 'bcrypt'

import otpGenerator from 'otp-generator'

import { sendOTP } from './extras/otp.js'

let otp = otpGenerator.generate(6, { digits: true, lowerCaseAlphabets: false, upperCaseAlphabets: false, specialChars: false })





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



    sendOTP(email, otp)



    const createdUser = await User.create({
        email, password: hashedPassword, username, otp
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
export const checkUserName = async (req, res) => {
    const { username } = req.body
    if (!username) {
        res.status(401)
        throw new Error('Please enter a mail')

    }
    let isUser = await User.findOne({ username })

    if (isUser) {
        res.send('exists')
    } else {
        res.send('not exists')
    }


}


export const verifyOTP = async (req, res) => {
    const { otp } = req.body
    const user_id = req.params.id

    if (!otp) {
        res.status(400)
        throw new Error('Please enter the OTP')
    }


    // find the user based upon the user_id

    const findUser = await User.findById(user_id)

    if (!findUser) {
        res.status(404)
        throw new Error('user not found')
    }

    // check if otp matches

    if (otp == findUser.otp) {
        findUser.otp = 'done'
        await findUser.save()

    } else {
        res.status(401);
        throw new Error('Invalid OTP or OTP expired')
    }


    res.send(findUser)



}