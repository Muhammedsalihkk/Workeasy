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
    registration_number:number,
    GST_number:string,
    company_type:string,
    primary_industry:string,
    annual_revanue?:number,
    phonenumber:number,
    logo?:string
    block:boolean
    email:string
    status:string
    admin_name:string,
    plan_type:string,
    plan_end:string
    address:address

}