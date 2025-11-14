import mongoose from "mongoose";
import { configData } from "../config/configData";
async function dbconnection(){
    try{
        await mongoose.connect(configData.db_address as string)
        console.log("Database connected");
        
        
    }
    catch(error){
        console.log("DB connection problem with: "+error);
        
    }
}
export default dbconnection