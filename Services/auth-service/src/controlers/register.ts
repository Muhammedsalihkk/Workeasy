import { Response, Request, NextFunction } from "express";
import { validation } from "../middlewares/datavalidation";
import { user_registration } from "../services/registraionserver";

export const dataregister = async(req: Request, res: Response, next: NextFunction) => {
    try {
        const { error } = validation.validate(req.body)
        if (error) {
            const err: any = new Error(error.details[0].message)
            err.code = 400
            throw err
        }
        
        const result:any= await user_registration(req.body)
        if(result=="success")
        {
              res.status(200).json({message:result})
        }
        else{
             const err: any = new Error(result)
            err.code = 400
            throw err
        }
          
    }
    catch (error) {
        
        next(error)
    }
}