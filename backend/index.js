import express from 'express'
import dotenv from 'dotenv'
import colors from 'colors'
import { userRouter } from './routes/userRoutes.js'
import { errorHandler } from './middlewares/errorMiddleware.js'
import { connectDB } from './config/connect.js'
import cors from 'cors'
dotenv.config()
const app = express()

app.use(cors())


connectDB()


app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/api/users/', userRouter)

app.use(errorHandler)


app.listen(process.env.PORT_NO, () => console.log(`Server started on port:${process.env.PORT_NO.yellow}`))