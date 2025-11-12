import { NextFunction, Request, Response } from "express";
import { gettallcompany_service } from "../services/getAllcompany_service";
import { Onecompany_service } from "../services/getOnecompany_service";
import { AuthRequest } from "../interface/company.interface";

export const getallcompany = async (req: Request, res: Response,next:NextFunction): Promise<void> => {
    try {
        const limit:number=Number(req.query.limit)||3
        const page:number=Number(req.query.page)||1
        const search:string=req.query.search as string||""
        const plan:string=req.query.plan as string||""
        const status:string=req.query.status as string||""
        const Rfromdate:string=req.query.Rfromdate as string||""
        const Rendate:string=req.query.Rendate as string||""
        const Sfromdate:string=req.query.Sfromdate as string||""
        const Sendate:string=req.query.Sendate as string||""
        const skip:number=(page-1)*limit
        const companydata: any = await gettallcompany_service(skip,limit,search,status,Rfromdate,Rendate,Sfromdate,Sendate)
        res.status(200).json({ message: companydata })
    }
    catch (error) {
         const err:any=new Error((error as Error).message)
            err.code=500
            next(err)
    }

}
export const get_Onecompany = async (req: AuthRequest, res: Response,next:NextFunction): Promise<void> => {
    try {
        const id  = req.params.id||req.user.company_id
        
        const data = await Onecompany_service(id)
        if (!data) {
         const err:any=new Error("id not match with any comapny")
            err.code=500
            throw err
        }
        else {
            res.status(200).json({ message: data })
        }
    }
    catch (error) {
        next(error)
    }

}