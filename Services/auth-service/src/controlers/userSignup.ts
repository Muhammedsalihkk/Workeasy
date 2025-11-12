import { Request, Response, NextFunction } from "express";
import { validation } from "../middlewares/datavalidation";
import { User_register } from "../services/userRegister_service";
import { AuthRequest } from "../interfaces/interface";
export const UserRegistration = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
        console.log("this is your req.body",req.body);
        const { error } = validation.validate(req.body)
        if (error) {
            console.log(error.details);
            const err: any = new Error(error.details[0].message)
            err.code = 400
            throw new Error(err)
        }
        
        
        const result = await User_register(req.body, req.user.company_id||req.params.company_id)        
        res.status(200).json({ message: result })
        }
         catch (error) {
            console.log("this is your err",error);
            
        next(error)
    }

}
   
