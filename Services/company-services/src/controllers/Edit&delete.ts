import { Response ,Request } from "express";
import { delete_services, editcompany_services } from "../services/editcompany";

export const editcompany=async(req:Request,res:Response):Promise<void>=>{
  try{
    const updateddata=req.body
    const {id}=req.params
    const result:any=await editcompany_services(id,updateddata)
    if(result)
    {
         res.status(200).json({message:result})
    }
    else{
        res.status(404).json({error:"editing failed"})
    } 
  }
  catch(error)
  {
    res.status(500).json({error:error})
  }
}
export const deletcompany=async(req:Request,res:Response):Promise<void>=>{
    const {id}=req.params
    try{
        const result=await delete_services(id)
        res.status(200).json({message:result})
    }
    catch(error)
    {
        res.status(500).json({error:error})
        
    }

}   