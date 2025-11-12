import { NextFunction, Request,Response } from "express"
import { register_service } from "../services/register_service"
import { company } from "../interface/company.interface"
import { validation_company } from "../validators/company.validator"
import { delete_services } from "../services/editcompany"
export const register_company=async(req:Request,res:Response,next:NextFunction):Promise<void>=>{
  
      try{
        
        
        const {error}=validation_company.validate(req.body)
        
        if(error){
           const err:any=new Error(error.details[0].message)
           err.code=400
           throw err
        }
        const result:any= await register_service(req.body)
        if(typeof result=="object"&&result!=null)
        {          
          res.status(200).json({message:result.id,status:result.registration_status})
        }
        else{
            const err:any=new Error(result)
            err.code=500
            throw err
        }
      }
      catch(error){
        next(error)
      }

}
