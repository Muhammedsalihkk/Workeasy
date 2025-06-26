import express from "express";
import companeyrouter from "./routers/company-router"
import { configdata } from "./config/env";
import { connectdb } from "./config/db";
import { errorhandling } from "./middlewares/errorhadling";
import cookieParser from "cookie-parser"
import { recivemessage } from "./config/Rabitmq.connection";

const app=express()
connectdb()
recivemessage()
app.use(express.json())
app.use(cookieParser())
app.use('/api',companeyrouter)
  app.listen(configdata.Port,()=>{
    console.log(`companyserver is running `);
  })
app.use(errorhandling)

export default app