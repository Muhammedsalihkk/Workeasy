import { model, Schema } from "mongoose";
import { attendence, face_embedded } from "../interfaces/attendeceInterface";



const attendence_schema=new Schema<attendence>({
        user_id:{type:String,required:true,index:true},
        company_id:{type:String,required:true},
        date:{type:String,
            default:()=>new Date().toISOString().split("T")[0]
        },
        clock_in:{type:Date,default:Date.now},
        check_Time:{type:String,required:true},
        clock_out:{type:String,default:"pending"},
        Check_Status:{type:String},
        Day_Status:{type:String},
        working_hour:{type:String,default:"pending"}
})

const attendece_imaege_data=new Schema<face_embedded>({
    user_id:{type:String,required:true,unique:true,index:true},
    face_embedded:{type:[Number],required:true}
})

const attendecContorler=model<attendence>("attendece_registers",attendence_schema)
const embedded_model=model<face_embedded>("image_stors",attendece_imaege_data)

export {attendecContorler,embedded_model}