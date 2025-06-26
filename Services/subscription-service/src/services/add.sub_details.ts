import { sub_data } from "../interfaces/sub_data";
import { subscription_model } from "../models/Submodel";

export const add_subdetials_service=async(data:sub_data)=>{

   try{
     const result=await subscription_model.create({
        company_id:data.company_id,
        plane_type:data.plan_type,
        plan_start:data.plan_start,
        plan_end:data.plan_end,
        amount:data.amount,
        method:data.method,
        payment_id:data.payment_id  
    })
    return result
   }
   catch(error)
   {
    throw error
   }

}