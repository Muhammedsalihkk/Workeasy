import { NextFunction,Request,response,Response } from "express";
import { jwt_verify } from "../utils/jwt.creation";

export const is_supaeradmin=(req:Request,res:Response,next:NextFunction)=>{
        const {token}=req.cookies
        if(!token)
        {
            res.status(403).json({messsage:"unautherized"})
        }
        const response:any=jwt_verify(token)
        if(!response)
        {
            res.status(401).json("invalid token")
        }
        else if(response.role!="superadmin")
        {
            res.status(401).json({messgae:"access denied to this url"})
        }
        else{
            res.locals.user_id=response.owner_id
            res.locals.role=response.role,
            next()
        }
}