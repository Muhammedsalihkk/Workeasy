import express from "express";
import companeyrouter from "./routers/company-router"
import { configdata } from "./config/env";
import { connectdb } from "./config/db";

const app=express()
connectdb()
app.use(express.json())
app.use('/api',companeyrouter)
  app.listen(configdata.Port,()=>{
    console.log(`server is running on ${configdata.Port}`);
  })

export default app