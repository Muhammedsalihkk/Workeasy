import mongoose, { Schema ,model} from "mongoose";

const db_schema=new Schema({
    company_id:{type:String,required:true},
    plane_type:{type:String,required:true},
    Status:{type:String,default:"active"},
    plan_start:{type:String,required:true},
    plan_end:{type:String,required:true},
    amount:{type:Number,required:true},
    payment_id:{type:String,required:true}

})

export const subscription_model=mongoose.model("subscription",db_schema)