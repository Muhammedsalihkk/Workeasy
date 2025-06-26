import { Request,Response,NextFunction } from "express";
import { getsub_details_service } from "../services/getsubscription";
import { send_message } from "../confiq/Rabitmq.connection";

export const getsubscription_details=async(req:Request,res:Response,next:NextFunction)=>{

        try{
        const id=req.params.id||res.locals.company_id
        const result= await getsub_details_service(id)
     
        
        res.status(200).json({result})
        }
        catch(error:any)
        {
            const err:any=new Error(error.message)
            err.code=404
            next(err)
        }

}       