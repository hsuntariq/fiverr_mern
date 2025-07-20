import mongoose from 'mongoose'

const userSchema = mongoose.Schema({
    email: {
        type: String,
        required: [true, 'Please enter the email']
    },
    password: {
        type: String,
        required: [true, 'Please enter the password']
    },
    username: {
        type: String,
        required: [true, 'Please enter the username']
    }
}, {
    timestamps: true
})


export const User = mongoose.model('User', userSchema)