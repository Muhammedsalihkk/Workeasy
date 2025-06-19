import {Schema,model} from "mongoose";
import { company } from "../interface/company.interface";

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
    logo:{type:String},
    status:{type:String,default:"active"},
    address:{
        place:{type:String,require:true},
        pin:{type:Number,require:true},
        distict:{type:String,require:true},
        state:{type:String,require:true},
        
    }
})
export const company_model=model<company>("companydbs",companyschema)