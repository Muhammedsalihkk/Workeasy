import { Response, Request, NextFunction } from "express";
import { validation } from "../middlewares/datavalidation";
import { owner_registration } from "../services/owner_register";

export const owneregister = async (req: Request, res: Response, next: NextFunction) => {
    
    try {
        const { error } = validation.validate(req.body)
        if (error) {
            console.log("kjadvhksdj");
            
            const err: any = new Error(error.details[0].message)
            err.code = 400
            throw err
        }
        console.log(req.params.id);
        
        const result: any = await owner_registration(req.body, req.params.id)
        if (typeof result == "object" && result != null) {
            res.status(200).json({ message: result })
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