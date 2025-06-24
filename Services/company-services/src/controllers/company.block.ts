import { NextFunction,Request,Response } from "express";
import { block_company_service } from "../services/block_company";

export const block_company=async(req:Request,res:Response,next:NextFunction)=>{
  try{
      const {id}=req.params
    const response=await block_company_service(id)
    if(response)
    {
         res.status(200).json({response})
    }
  }
    catch(error)
    {
        next(error)
    }
}