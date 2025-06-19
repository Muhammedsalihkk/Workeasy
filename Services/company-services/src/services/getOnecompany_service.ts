
import { company_model } from "../models/company_schema";

export const Onecompany_service=async(id:string):Promise<any>=>{
   try{
     const comapnydata= await company_model.findById(id)
     return comapnydata
   }
   catch(error){
    throw error
   }
    
}