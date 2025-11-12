import express from "express";
import companeyrouter from "./routers/company-router"
import { configdata } from "./config/env";
import { connectdb } from "./config/db";
import { errorhandling } from "./middlewares/errorhadling";
import cookieParser from "cookie-parser"
import { recivemessage } from "./config/Rabitmq.connection";
import cors from 'cors'

const app=express()
app.use(cors({
  origin:"http://localhost:5173",
  credentials:true
}))
app.use(express.json())
app.use(cookieParser())

// Initialize database connection
connectdb()

// Initialize RabbitMQ connection (non-blocking - service continues even if RabbitMQ is unavailable)
recivemessage().catch((error) => {
    console.error('Failed to initialize RabbitMQ connection:', error);
    console.log('Service will continue running without RabbitMQ. Reconnection will be attempted.');
});
app.use('/api',companeyrouter)
app.listen(configdata.Port,()=>{
    console.log(`companyserver is running `);
  })
app.use(errorhandling)
export default app
