import { Response ,Request, NextFunction } from "express";
import { delete_services, editcompany_services } from "../services/editcompany";
import { uploadimage } from "../middlewares/Cloudinarystoring";


export const editcompany=async(req:Request,res:Response,next:NextFunction):Promise<void>=>{
  try{
    if(req.file?.path){
      const imgurl= await uploadimage(req.file.path)
      console.log("this si your file path",req.file.path);
      
      req.body.logo=imgurl
    }
    const updateddata=req.body    
    const id=res.locals.company_id
    const result:any=await editcompany_services(id,updateddata)
  
    if(result)
    {
         res.status(200).json({message:result})
    }
    else{
          const err:any=new Error("edit company not found")
            err.code=404
            throw err
    } 
  }
  catch(error)
  {
    next(error)
  }
}
export const deletcompany=async(req:Request,res:Response,next:NextFunction):Promise<void>=>{
    const {id}=req.params
    try{
        const result=await delete_services(id)
        if(!result)
        { 
            const err:any=new Error("company nort found")
            err.code=404
            throw err
        }
        res.status(200).json({message:result})
        
    }
    catch(error)
    {
       next(error)
        
    }

}   