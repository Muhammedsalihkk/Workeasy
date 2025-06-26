import { employeemodel } from "../models/employee_model";
import { ownermodel } from "../models/owner_model";

export const getemployee_profile_service=async(id:string)=>{
  try{    
    const data=await employeemodel.findById(id)
    return data
  }
  catch(error){
    throw error
  }
}

export const edit_employee_profile=async(profile_data:any)=>{
     
      try{
          const updated_one=await employeemodel.findOneAndUpdate(
                {employee_id:profile_data.updation_id,
                company_id:profile_data.company_id},
                {$set:profile_data},
                {new:true}
        ).select("-password")
        return updated_one
      }
      catch(error){
        throw error
      }
}
export const delete_employee=async(id:string)=>{

        try{
            const respons= await employeemodel.findByIdAndDelete(id)
            return respons
        }
        catch(error)
        {
            throw error
        }
} 