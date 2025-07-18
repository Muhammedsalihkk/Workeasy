import { Response, Request, NextFunction } from "express";
import { validation } from "../../middlewares/datavalidation";
import { owner_registration } from "../../services/owner_register";
import { send_message } from "../../config/rabitmq";


export const owneregister = async (req: Request, res: Response, next: NextFunction) => {
    
    try {
        const { error } = validation.validate(req.body)
        if (error) {
            const err: any = new Error(error.details[0].message)
            err.code = 400
            throw err
        }  
        const result: any = await owner_registration(req.body)
        if (typeof result == "object" && result != null) {
            const response:string= await send_message({id:req.body.company_id,admin_name:req.body.admin_name,status:"active",registration_status:"completed"})
            console.log("this is respons",response);
            
            if(response=="success")
            {
                 res.status(200).json({ message: result })
            }
            else{
                throw "server problem"
            }
           
        }
        else {
            const err: any = new Error(result)
            err.code = 400
            throw err
        }
    }
    catch (error) {
        next(error)
    }
}