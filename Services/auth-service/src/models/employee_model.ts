import { Schema, model } from "mongoose";
import { owner } from "../interfaces/interface";

const userschema = new Schema({
    company_id: { type: String, required: true },
    img:{type:String},
    employee_id:{type:String,required:true},
    dob:{type:String},
    shift:{type:String,required:true},
    join_date:{type:String,required:true},
    name: { type: String, required: true, index: true },
    gender:{type:String,required:true},
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true ,index:true},
    number: { type: String, required: true, unique: true },
    role: { type: String, default:"employee" },
    Salary:{type:Number,required:true},
    company_role: { type:String, required: true },
    department:{type:String,requird:true},
    status:{type:String,default:"active"},
    qualification:{type:String,require:true},
    Address:{   
        place:String,
        pin:Number,
        distct:String,
        state:String
    }
})

export const employeemodel = model<owner>("employees", userschema)