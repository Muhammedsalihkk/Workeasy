import { NextFunction, Request,Response } from "express";
import { employee_count_service } from "../../services/count";


export const getcount=async(req:Request,res:Response,next:NextFunction)=>{

   try{
     const {company_id}=res.locals
    const employee_count=await employee_count_service(company_id)
    res.status(200).json({count:employee_count})
   }
   catch(error){
    next(error)
   }
}