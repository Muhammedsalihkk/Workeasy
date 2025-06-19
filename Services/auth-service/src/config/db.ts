import { configdata } from "./congration";
import mongoose from "mongoose";

export const db_connection = async()=> {
  try{
      if (configdata.db_address) {
        await mongoose.connect(configdata.db_address,)
        console.log("db connecting");
        
       }
       else{
        const err:any="sry"
        throw err
       }
  }
  catch(err){
    console.log(err);
    
  }
}
