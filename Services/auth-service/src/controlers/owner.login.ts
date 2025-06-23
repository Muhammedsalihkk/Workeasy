import { NextFunction, Request, Response } from "express";
import { authData_validation } from "../middlewares/datavalidation";
import { owner_authentication_service } from "../services/authentication";

export const owner_authenticqtion = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { error } = authData_validation.validate(req.body)
        if (error) {
            const err: any = new Error(error.details[0].message)
            err.code = 404
            throw err
        }
        const response: any = await owner_authentication_service(req.body)
        if (response.message) {
            throw response
        }
        res.cookie('token',response,{
            httpOnly:true,
            secure:false,
            maxAge:60*60*1000
        })
        res.status(200).json({messaeg:"success login"})

    }
    catch (error) {
        next(error)
    }

} 