import { NextFunction,Request,Response } from "express"
import { getemployee_profile_service } from "../services/Eprofile"
import { getowner_profile_service } from "../services/Own.profile"

export const getemployee_profile= async(req:Request,res:Response,next:NextFunction)=>{
      try{
        const id=req.params.id||res.locals.user_id
        const response=await getemployee_profile_service(id)
        res.status(200).json({response})
      }
      catch(error){
        next(error)
      }
}
export const getowner_profile=async(req:Request,res:Response,next:NextFunction)=>{
        try{
        const id=req.params.id||res.locals.user_id
         console.log('id is',id);
        const response=await getowner_profile_service(id)
        res.status(200).json({response})
      }
      catch(error){
        next(error)
      }
} 
       
