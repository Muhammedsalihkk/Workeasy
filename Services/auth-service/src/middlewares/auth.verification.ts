import { NextFunction, Request, Response } from "express";
import { jwt_verify } from "../utils/jwt.creation";
import { AuthRequest } from "../interfaces/interface";

export const authentication_verify = (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
        
        const { token } = req.cookies
         
        if (!token) { 
            res.status(401).json({ message: "un authrized",status:401 })
        }
        else {
            const response: any = jwt_verify(token)
            if (response) {
                req.user=response
                return next()
            }
        }


    }
    catch (error: any) {
        res.status(500).json({ message: error.message })
    }

}