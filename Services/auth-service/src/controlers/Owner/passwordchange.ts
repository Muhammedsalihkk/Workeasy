import { Response, Request, NextFunction } from "express";
import { changepassword_service, generateotp, sendotp, verify_OTP } from "../../middlewares/send_otp";
import { add_activity } from "../../services/Addtoactivity";

export const changeapssword = async(req: Request, res: Response, next: NextFunction) => {
    try {
        const otp = generateotp()
        
        const { email } = req.body
        console.log("number is",email);
        
        const id = res.locals.user_id
        const respons = await sendotp(id, email, otp)
        console.log(respons);
        res.status(200).json({ message: "message send to your number" })
    }
    catch (error: any) {
        next(error.message)
    }
}
export const verify_otp = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = res.locals.user_id
        const { enterdotp } = req.body
        const response = await verify_OTP(id, enterdotp)
        if(response){
            res.status(200).json({message:"success"})
        }
        else{
            res.status(403).json({message:"notmatch"})
        }
    }
    catch(error:any){
        next(error.message)
    }
} 
export const change_password=async (req: Request, res: Response, next: NextFunction)  =>{
          try { 
            const {new_password}=req.body
            const id=res.locals.user_id
            const updatepassword=await changepassword_service(id,new_password)
            const activity=await add_activity(id,"password changed")
            res.status(200).json({message:"success"})}
            catch(error:any){
                res.status(500).json({message:"somthing wrong try after somtimes"})
            }
}