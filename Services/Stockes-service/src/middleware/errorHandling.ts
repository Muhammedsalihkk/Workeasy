import { Request,Response,NextFunction } from "express"
export const error_handling=(err:any,req:Request,res:Response)=>{

    const code=err.code||500
    const message=err.message||"somthing wrong in server"
    res.status(code).json({message:message})

}