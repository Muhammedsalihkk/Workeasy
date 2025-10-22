import { activities_model } from "../models/Activities";
import { UserModel } from "../models/userModel";
import { add_activity } from "./Addtoactivity";

export const getemployee_profile_service=async(id:string)=>{
  try{    
    const data=await UserModel.findById(id)
    return data
  }
  catch(error){
    throw error
  }
}

export const edit_employee_profile=async(profile_data:any,id:string)=>{
     
      try{    
        console.log("id is ",profile_data);
        
         const updated_one= await UserModel.findByIdAndUpdate(id,
          {...profile_data},
          {new:true,runValidators:true})
         
           console.log("updated data",updated_one);
        return updated_one
       
        
      }
      catch(error){        
        throw error
      }
}
export const delete_employee=async(id:string)=>{

        try{
            const respons= await UserModel.findByIdAndDelete(id)
            return respons
        }
        catch(error)
        {
            throw error
        }
} 