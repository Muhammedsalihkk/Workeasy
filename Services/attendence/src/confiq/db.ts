import mongoose from "mongoose";
import secret_data from "./data";

function dbconnection(){
   try{     
     mongoose.connect(secret_data.db_url)
    console.log("db connect");
   }
   catch(error){
    console.log(error);
    
   }
}
export default dbconnection