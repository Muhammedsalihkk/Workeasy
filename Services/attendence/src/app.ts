import express from "express"
import dbconnection from "./confiq/db"
import secret_data from "./confiq/data"
import cors from 'cors'
import cookieParser from "cookie-parser"
import router from "./router/attendence"
const app=express()
dbconnection()
app.use(cookieParser())
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}))
app.use(express.json())
app.use('/api',router)

app.listen(secret_data.port,()=>{
    console.log("attendeceserver is running")
})

