import { NextFunction, Request, response, Response } from "express";
import { delete_employee, edit_employee_profile } from "../services/Eprofile";
import { edit_owner_profile } from "../services/Own.profile";
import { event } from "../middlewares/evnet_emitter";
import { event_emiter } from "../services/company_db";


export const Profile_edit = async (req: Request, res: Response, next: NextFunction) => {

    try {
        req.body.company_id = res.locals.company_id
        req.body.updation_id=req.body.id||res.locals.user_id
        if(req.body.id||res.locals.role=="employee")
        {
            const respons = await edit_employee_profile(req.body)  
            res.status(200).json({ respons })
        }
        else{
            event_emiter()
            const respons =await edit_owner_profile(req.body)
            event.emit("admin updation",respons)
            res.status(200).json({ respons })
        }
    }
    catch (error: any) {
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
        res.status(200).json({message:"logout successfully completed"})
}