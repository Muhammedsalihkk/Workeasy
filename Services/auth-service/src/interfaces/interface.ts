import { Document } from "mongoose";

export interface owner {
    admin_name: string
    img:string
    confirm_password:string
    company_id:string
    password: string
    number: string
    email: string
}
export interface employee {
    employee_id:string
    name: string
    shift:String,
    gender:string,
    join_date:string,   
    password: string
    number: string
    email: string
    department:string
    company_role: string
    salary:Number
    qualification:string
}
export interface authentication{
    email:string,
    password:string
}