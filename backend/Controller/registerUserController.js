import { Users } from "../Models/usersModel.js"
import bcrypt from "bcrypt";
import { sendOTP } from "./Extras/Otp.js";
import otpgenerator from "otp-generator"
import { sendResetMail } from "./Extras/resetLink.js";


export const registerUsers = async (req, res) => {

    const { userName, email, password } = req.body

    if (!userName || !email || !password) {

        res.status(400)
        throw new Error('Please enter all the relavent fields')
    }



    const checkUserName = await Users.findOne({ userName })
    const checkEmail = await Users.findOne({ email })

    if (checkUserName) {
        res.status(401);
        throw new Error("Usere Name Already Exited ")
    }
    if (checkEmail) {
        res.status(401);
        throw new Error("Email Already Exited ")
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    let otp = otpgenerator.generate(6,
        { upperCaseAlphabets: false, specialChars: false, digits: true, lowerCaseAlphabets: false })


    sendOTP(email, otp)


    const createUsers = await Users.create({
        userName, email, password: hashedPassword, otp
    })



    res.json(createUsers)

}


export const checkMail = async (req, res) => {
    const { email } = req.body
    if (!email) {
        res.status(401)

    }
    let isUsers = await Users.findOne({ email })


    if (isUsers) {
        res.send("Email Already Existed")
    } else {
        res.send("Email Not Existed")
    }

}
export const checkUserName = async (req, res) => {
    const { userName } = req.body
    if (!userName) {
        res.status(401)

    }
    let isUsers = await Users.findOne({ userName })


    if (isUsers) {
        res.send("UserName Already Existed")
    } else {
        res.send("UserName Not Existed")
    }

}

export const verifyOtp = async (req, res) => {
    const { otp } = req.body
    const user_id = req.params.id
    if (!otp) {
        res.send(400)
        throw new Error("Please Enter The Otp")
    }


    const findUsers = await Users.findById(user_id)

    if (!findUsers) {
        res.status(404)
        throw new Error("User Not Found")
    }



    if (findUsers.otp == otp) {
        findUsers.otp = "done"
        findUsers.save()
    } else {
        res.status(401)
        res.send("Invalid Otp or Otp Expired ")
        throw new Error("Invalid Otp or Otp Expired ")
    }


    res.send(findUsers)

}


export const checkSignInPass = async (req, res) => {
    const { password } = req.body
    const user_id = req.params.id
    if (!password) {
        res.send(400)
        throw new Error("Please Enter The passwords")
    }


    const findUsers = await Users.findById(user_id)

    if (!findUsers) {
        res.status(404)
        throw new Error("User Not Found")
    }



    if (password == findUsers.password) {
        res.send("Password Matched")
    } else {
        res.status(401)

        throw new Error("Invalid Passwords ")
    }


    res.send(findUsers)

}




export const resendOTP = async (req, res) => {
    const user_id = req.params.user_id
    const { email } = req.body
    let findUser = await Users.findById(user_id)

    if (!findUser) {
        res.status(404)
        throw new Error('User not found')
    }

    let otp = otpgenerator.generate(6, { digits: true, upperCaseAlphabets: false, lowerCaseAlphabets: false, specialChars: false })

    sendOTP(email, otp)

    findUser.otp = otp
    await findUser.save()
    res.send(findUser)

}


export const sendResetLink = async (req, res) => {
    const { email } = req.body
    let checkUser = await Users.findOne({ email })
    if (!checkUser) {
        res.status(404)
        throw new Error('Invalid Email')
    }

    // // genetate the reset token
    let token = otpgenerator.generate(50, { specialChars: false })
    checkUser.resetToken = token
    await checkUser.save()
    // send the reset link to the user
    let link = `http://localhost:5173/reset-password/${token}`
    sendResetMail(email, link)
    res.send(checkUser)
}


export const resetPassword = async (req, res) => {
    let token = req.params.token
    const { password } = req.body
    let findUser = await Users.findOne({ resetToken: token })
    if (!findUser) {
        res.status(401)
        throw new Error('Invalid Token')
    }
    let hash = await bcrypt.hash(password, 10)
    findUser.password = hash
    findUser.resetToken = null
    await findUser.save()
    res.send(findUser)
}