import express from 'express'
import { configration_data } from './confiq/congig.data'
import { db_connection } from './confiq/db.connection'
import subrouter from './routers/routers'
import { error_handling } from './middlewares/errorhandling'
const app=express()
app.use(express.json())
db_connection()

app.use('/api',subrouter)

app.listen(configration_data.server_port,()=>{
    console.log("subscription server running");
    
})
app.use(error_handling)