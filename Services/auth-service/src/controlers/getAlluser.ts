import { NextFunction, Request, Response } from "express";
import { UserAll } from "../services/userGetall_service";
export const getall_User = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const limit: number = Number(req.query.limit) || 10
        const page: number = Number(req.query.page) || 1
        const skip: number = (page - 1) * limit
        const search = req.query.search as string || ""
        const department = req.query.department as string || ""
        const status = req.query.status as string || ""
        const shift = req.query.shift as string || ""    
        const company_id=res.locals.company_id

        const respons = await UserAll(limit,skip,search,department,status,shift,company_id,)
        res.status(200).json(respons)
    }
    catch (error) {
        const err: any = new Error((error as Error).message)
        next(err)
    }
}