import { NextFunction, Request, Response } from "express";
import { jwt_verify } from "../utils/jwt.creation";

export const authentication_verify =  (req: Request, res: Response, next: NextFunction) => {
    try {
        const { token } = req.cookies
        if (!token) {
           res.status(401).json({message:"un authrized"})
        }
        const response:any = jwt_verify(token)
        if(response)
        {
            res.locals.user_id=response.owner_id||response.employee_id
            res.locals.role=response.role
            res.locals.company_id=response.company_id
            response.company_postion?res.locals.postion=response.company_postion:null
            next()
        }
       
    }
    catch (error:any) {
        res.status(500).json({message:error.message})
    }

}