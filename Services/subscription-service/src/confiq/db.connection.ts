import mongoose from "mongoose";
import { configration_data } from "./congig.data";

export const db_connection=()=>{
    try{
        mongoose.connect(configration_data.db_port)
        console.log("db connected");
    }
    catch(err:any)
    {
        console.log(err.message);
        
    }
}

