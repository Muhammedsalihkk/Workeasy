import { company_model } from "../models/company_schema"

export const block_company_service=async(id:string)=>{

  try{
      const data= await company_model.findById(id).select("block")
    if(!data)
    {
        throw "company not exist"
    }
    
    const result=await company_model.findByIdAndUpdate(id,{
        block:!data.block
    },{new:true})
    return result
  }
  catch(error){
    throw error
  }
}