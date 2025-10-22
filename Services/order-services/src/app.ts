import express from "express";
import cors from 'cors'
import cookieParser from "cookie-parser";
import confiqdata from "./confiq/configration";
import router from "./routers/orderRouters";
import dbConnection from "./confiq/db";
import errorHandler from "./middleware/errohandling";
const app=express()
dbConnection()
app.use(cors({
  origin:"http://localhost:5173",
  credentials:true
}))
app.use(express.json())
app.use(cookieParser())
app.use('/api',router)
app.listen(confiqdata.serverPort,()=>{
    console.log(`orderServer is running,${confiqdata.serverPort} `);
  })
app.use(errorHandler)

export default app