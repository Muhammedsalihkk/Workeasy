import express from "express"
import { configdata } from "./config/congration"
import authrouter from "./routers/authrouters"
import { errorhadller } from "./middlewares/errormiddleware"
import { db_connection } from "./config/db"
const app=express()
app.use(express.json())
db_connection()
app.use('/auth',authrouter)
app.listen(3001,()=>{
    console.log("server running")
})
app.use(errorhadller)