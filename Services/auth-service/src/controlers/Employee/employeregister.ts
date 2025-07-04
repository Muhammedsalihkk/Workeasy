import { Request, Response, NextFunction } from "express";
import { employee_validation } from "../../middlewares/datavalidation";
import { employee_register } from "../../services/employee_register";
import { add_activity } from "../../services/Addtoactivity";


export const employeeregister = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { error } = employee_validation.validate(req.body)
        if (error) {
            const err: any = new Error(error.details[0].message)
            err.code = 400
        }
        const result = await employee_register(req.body, res.locals.company_id)        
        res.status(200).json({ message: result })
        }
         catch (error) {
            console.log("this is your err",error);
            
        next(error)
    }

}
   
