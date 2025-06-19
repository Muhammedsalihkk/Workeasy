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
    company_type:string,
    primary_industry:string,
    annual_revanue?:number,
    phonenumber:number,
    logo?:string
    email:string
    status:string
    address:address

}