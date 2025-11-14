
import express from 'express'
import cookieParser from 'cookie-parser'
import { configData } from './config/configData'
import dbconnection from './middleware/databaceConnection';
import router from './routers/stockRouters';
import { error_handling } from './middleware/errorHandling';
const app=express()
app.use(cookieParser())
dbconnection()
app.use('/api',router)
app.listen(configData.port,()=>{
    console.log("stock service is running");
})
app.use(error_handling)