import mongoose from "mongoose";
import confiqdata from "./configration";

function dbConnection(){
    const dburl =confiqdata.db_address as string
    mongoose.connect(dburl)
}
export default dbConnection