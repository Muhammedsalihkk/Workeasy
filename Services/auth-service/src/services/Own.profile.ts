import { activities_model } from "../models/Activities"
import { ownermodel } from "../models/owner_model"
import { add_activity } from "./Addtoactivity"

export const edit_owner_profile = async (user_data: any) => {

       try {
              const respons = await ownermodel.findByIdAndUpdate(user_data.updation_id,{...user_data},
                     { new: true, runValidators: true }
              ).select("-password")
              console.log(user_data.updation_id);
              
              const update=await add_activity(user_data.updation_id,"profile Edited")
              return respons
       }
       catch (error: any) {
              console.log(error.code);

              throw error.code
       }
}

export const getowner_profile_service = async (id: string) => {
       try {
              const data = await ownermodel.findById(id).select("-password")
              const activity=await activities_model.find({userId:id}).sort({_id:-1}).limit(3)
              if (!data) {
                     throw "id not match"
              }
              else {
                     return {data,activity}
              }
       }
       catch (error: any) {
              throw error.message
       }
}