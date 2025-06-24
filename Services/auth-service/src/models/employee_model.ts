import { Schema, model } from "mongoose";
import { owner } from "../interfaces/interface";

const userschema = new Schema({
    company_id: { type: String, required: true },
    employee_id:{type:String,required:true},
    DOB:{type:String},
    img:{type:String,required:true},
    shift:{type:String,required:true},
    join_date:{type:String,required:true},
    name: { type: String, required: true, index: true },
    gender:{type:String,required:true},
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true ,index:true},
    number: { type: String, required: true, unique: true },
    role: { type: String, default:"employee" },
    company_role: { type:String, required: true },
    Address:{
        place:String,
        pin:Number,
        distct:String,
        state:String
    }
})

export const employeemodel = model<owner>("employees", userschema)