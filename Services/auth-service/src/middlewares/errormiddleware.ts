import { Request,Response,NextFunction } from "express";

export const errorhadller=(err:any,req:Request,res:Response,next:NextFunction)=>{
        const message=err.message||"somthisng wrong"
        const code=500
       
        res.status(code).json({success:false,message})
}