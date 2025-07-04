import { NextFunction, Request, response, Response } from "express";
import { delete_employee, edit_employee_profile } from "../services/Eprofile";
import { edit_owner_profile } from "../services/Own.profile";
import { event } from "../middlewares/evnet_emitter";

import { send_message } from "../config/rabitmq";
import { activities_model } from "../models/Activities";
import { ulpaodfile } from "../middlewares/fileupload";


export const Profile_edit = async (req: Request, res: Response, next: NextFunction) => {
    try {
        req.body.updation_id=res.locals.user_id
        if(req.file?.path){
            const imgurl= await ulpaodfile(req.file.path)
            req.body.img=imgurl
        }
        const {data}=req.body
        if(req.query.id||res.locals.role=="employee")
        {     
           if(req.query.id){
            console.log("quer is",req.query.id);
            const respons = await edit_employee_profile(data,req.query.id as string)
            res.status(200).json({ respons })
           }
           else{
                const respons = await edit_employee_profile(req.body,res.locals.user_id as string)
           }
        }
        else{
            const respons =await edit_owner_profile(req.body)
               if(respons){
                const respons=await send_message(req.body)
            } 
            res.status(200).json({ respons })
        }
    }
    catch (error: any) {
        console.log("this is your error",error);
        
        next(error)
    }
}   
export const employee_delete=async(req:Request,res:Response,next:NextFunction)=>{
   try{
     const respons= await delete_employee(req.params.id)
    res.status(200).json({message:"employee deleted successfully"})
   }
   catch(error){
    next(error)
   }
}
export const user_logout= async (req:Request,res:Response,next:NextFunction)=>{
        res.clearCookie("token")
        res.status(500).json({message:"logout successfully completed"})
}