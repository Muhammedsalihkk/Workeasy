import { Request, Response, NextFunction } from "express";
import { employee_validation } from "../../middlewares/datavalidation";
import { employee_register } from "../../services/employee_register";


export const employeeregister = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { error } = employee_validation.validate(req.body)
        if (error) {
            const err: any = new Error(error.details[0].message)
            err.code = 400
        }
        const result = await employee_register(req.body, res.locals.company_id)
        if (typeof result == "object" && result != null) {
            res.status(200).json({ message: result })
        }
        else {
            const err: any = new Error(result)
            err.code = 500
            throw err
        }
    }
    catch (error) {
        next(error)
    }
}