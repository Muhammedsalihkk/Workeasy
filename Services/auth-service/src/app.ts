import express from "express"
import { configdata } from "./config/congration"
import authrouter from "./routers/authrouters"
import { errorhadller } from "./middlewares/errormiddleware"
import { db_connection } from "./config/db"
import cookieParser from "cookie-parser"
import cors from 'cors'
const app = express()
app.use(cookieParser())
app.use(express.json())
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}))


db_connection()
app.use('/auth', authrouter)
app.listen(3001, () => {
    console.log("authserever is running")
})
app.use(errorhadller)