import { subscription_model } from "../models/Submodel";

export const getsub_details_service=async(id:string)=>{

    try{
        const found=await subscription_model.find({company_id:id})
       if(found)
       {
            return found[0]
       }
       throw "not matching company id"
    }
    catch(error){
        throw error
    }
}