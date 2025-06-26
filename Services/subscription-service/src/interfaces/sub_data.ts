import { Document } from "mongoose";

export interface sub_data extends Document{
    company_id:string,
    plan_type:string,
    plan_start:string,
    plan_end:string,
    amount:number,
    method:string,
    payment_id:string

}