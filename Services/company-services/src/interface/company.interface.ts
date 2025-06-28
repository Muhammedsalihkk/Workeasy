import { Document } from "mongoose"

export interface address{
        place:string,
        pin:number,
        distict:string
        state:string,
      
    }

export interface company extends Document{
    legalname:string,
    date:string,    
    tradingname:string,
    registration_number:string,
    GST_number:string,
    company_type:string,
    primary_industry:string,
    phonenumber:string,
    logo?:string
    block:boolean
    registration_status:String
    email:string
    status:string
    admin_name:string,
    plan_type:string,
    plan_end:string
}