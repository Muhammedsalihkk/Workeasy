import { Request,Response } from "express"
import { register_service } from "../services/register_service"
import { company } from "../interface/company.interface"
import { validation_company } from "../validators/company.validator"
export const register_company=async(req:Request,res:Response):Promise<void>=>{

      try{
        const {error}=validation_company.validate(req.body)
        if(error){
           res.status(500).json({error:error.details[0].message}) 
           return
        }
        const companydata:company=req.body
        const result:string= await register_service(companydata)
        if(result=="success")
        {
            res.status(200).json({message:result})
        }
        else{
            res.status(400).json({error:result})
        }
      }
      catch(error){
        res.status(500).json({error:error})
      }

}
