import { activities_model } from "../models/Activities";
import { employeemodel } from "../models/employee_model";
import { ownermodel } from "../models/owner_model";
import { add_activity } from "./Addtoactivity";

export const getemployee_profile_service=async(id:string)=>{
  try{    
    const data=await employeemodel.findById(id)
    return data
  }
  catch(error){
    throw error
  }
}

export const edit_employee_profile=async(profile_data:any,id:string)=>{
     
      try{    
        console.log("id is ",profile_data);
        
         const updated_one= await employeemodel.findByIdAndUpdate(id,
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
            const respons= await employeemodel.findByIdAndDelete(id)
            return respons
        }
        catch(error)
        {
            throw error
        }
} 