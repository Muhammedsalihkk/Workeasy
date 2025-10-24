import {Schema,model} from "mongoose";
import { company } from "../interface/company.interface";
import { required, string } from "joi";

const companyschema=new Schema({
    legalname:{type:String,required:true,index:true},
    date:{type:String,required:true},
    tradingname:{type:String,required:true},
    registration_number:{type:String,required:true},
    GST_number:{type:String,required:true},
    company_type:{type:String,required:true},
    primary_industry:{type:String,required:true},
    phonenumber:{type:String,required:true,unique:true},
    email:{type:String,required:true,unique:true},
    admin_name:{type:String,default:"pending"},
    logo:{type:String},
    registration_status:{type:String,default:"subscription"},
    status:{type:String,default:"deactive"},
    plan_type:{type:String,default:"pending"},
    plan_end:{type:String,default:"pending"},
    block:{type:Boolean,default:false},
    address:{
        place:{type:String},
        pin:{type:Number},
        distict:{type:String},
        state:{type:String},     
    }
})
export const company_model=model<company>("Companies",companyschema)