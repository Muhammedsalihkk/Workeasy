import { Request,Response,NextFunction } from "express";

export const errorhandling=(err:any,req:Request,res:Response,next:NextFunction)=>{
    const statuscode=err.code||500
    const message=err.message||"server problem"
    res.status(statuscode).json({
        success:false,
        message
    })
}