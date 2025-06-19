import { NextFunction, Request,Response } from "express"
import { register_service } from "../services/register_service"
import { company } from "../interface/company.interface"
import { validation_company } from "../validators/company.validator"
export const register_company=async(req:Request,res:Response,next:NextFunction):Promise<void>=>{

      try{
        const {error}=validation_company.validate(req.body)
        if(error){
           const err:any=new Error(error.details[0].message)
           err.code=400
           throw err
        }
        const companydata:company=req.body
        const result:string= await register_service(companydata)
        if(result=="success")
        {
            res.status(200).json({message:result})
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
