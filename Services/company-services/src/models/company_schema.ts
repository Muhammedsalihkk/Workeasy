import {Schema,model} from "mongoose";
import { company } from "../interface/company.interface";
import { required } from "joi";


function getdate():Date{

    const today=new Date()
    return new Date(today.getFullYear(),today.getMonth(),today.getDate())
}


const companyschema=new Schema<company>({
    legalname:{type:String,required:true,index:true},
    date:{type:String,required:true},
    tradingname:{type:String,required:true},
    registration_number:{type:Number,required:true},
    company_type:{type:String,required:true},
    primary_industry:{type:String,required:true},
    annual_revanue:{type:Number},
    phonenumber:{type:Number,required:true,unique:true},
    email:{type:String,required:true,unique:true},
    admin_name:{type:String,required:true},
    logo:{type:String},
    status:{type:String,default:"active"},
    plan_type:{type:String,required:true},
    plan_end:{type:String,required:true},
    address:{
        place:{type:String,required:true},
        pin:{type:Number,required:true},
        distict:{type:String,required:true},
        state:{type:String,required:true},
        
    }
})
export const company_model=model<company>("companydbs",companyschema)