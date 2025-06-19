import mongoose from 'mongoose'
import { configdata } from './env'


export const connectdb=async():Promise<void>=>{
    try{
        if(configdata.Db)
        {
            await mongoose.connect(configdata.Db)
            console.log("db connected");
            
        }
    }
    catch(error){
        console.log("db connecting problem");
    }
}