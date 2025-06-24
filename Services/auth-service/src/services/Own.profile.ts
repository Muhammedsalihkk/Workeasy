import { ownermodel } from "../models/owner_model"

export const edit_owner_profile = async (user_data: any) => {

       try {
              const respons = await ownermodel.findOneAndUpdate(
                     {
                            _id: user_data.updation_id,
                            company_id: user_data.company_id
                     },
                     user_data,
                     { new: true, runValidators: true }
              ).select("-password")
              return respons
       }
       catch (error) {
              throw error
       }
}

export const getowner_profile_service = async (id: string) => {
       try {
              const data = await ownermodel.findById(id)
              if (!data) {
                     throw "id not match"
              }
              else {
                     return data
              }
       }
       catch (error) {
              throw error
       }
}