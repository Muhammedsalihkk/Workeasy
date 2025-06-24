import { NextFunction,Request,Response } from "express";
import { jwt_verify } from "../utils/jwt.creation";

export const owner_authrization=(req:Request,res:Response,next:NextFunction)=>{
      try{
        const {token}=req.cookies
        if(!token)
        {
            const err:any=new Error("un authrized")
            err.code=401
            throw err
        }
        const decoded:any=jwt_verify(token)
        if(!decoded)
        {   
            res.status(401).json({message:"un authrized"})
        }
        
        if(decoded.role!="companyadmin")
        {
           res.status(403).json({message:"access denied : not an company admin"})
        }
        else{            
            res.locals.company_id=decoded.company_id
            next()
        }

      }
      catch(error:any){
        res.status(500).json({message:error.message})
      }
}