import { Request, Response, NextFunction } from "express";
import { validation } from "../middlewares/datavalidation";
import { User_register } from "../services/userRegister_service";
export const UserRegistration = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { error } = validation.validate(req.body)
        if (error) {
            const err: any = new Error(error.details[0].message)
            err.code = 400
        }
        const result = await User_register(req.body, res.locals.company_id)        
        res.status(200).json({ message: result })
        }
         catch (error) {
            console.log("this is your err",error);
            
        next(error)
    }

}
   
