import mongoose from "mongoose"


const userSchema = mongoose.Schema({
    userName: {
        type: String,
        required: false,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    otp: {
        type: String,
        default: null
    },
    resetToken: {
        type: String,
        default: null
    }
}, { timestamps: true })


export const Users = mongoose.model("Users", userSchema)