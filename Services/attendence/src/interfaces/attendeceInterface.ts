import { Document } from "mongoose";

export interface attendence extends Document {
    user_id:string,
    company_id:string
    date:string,
    clock_in:Date,
    check_Time:string
    clock_out:string,
    Check_Status:string
    Day_Status:string
    working_hour:string
}
export interface face_embedded extends Document{
    user_id:string,
    face_embedded:number[]
}

