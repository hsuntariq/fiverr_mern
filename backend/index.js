import express from "express"
import colors from "colors"
import dotenv from "dotenv"
import { usersRouter } from "./Routes/registerUserRouter.js"
import { errorHandler } from "./middleware/errorMiddlleware.js"
import { connectDB } from "./Config/Connect.js"
import cors from "cors"
dotenv.config()
const app = express()


app.use(cors())


connectDB()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))


app.use('/api/users', usersRouter)
app.use(errorHandler)

app.listen(process.env.PORT_NO, () => console.log(`Server Started On PORT ${process.env.PORT_NO.cyan}`)
)