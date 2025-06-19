import { Request, Response } from "express";
import { gettallcompany_service } from "../services/getAllcompany_service";
import { Onecompany_service } from "../services/getOnecompany_service";

export const getallcompany = async (req: Request, res: Response): Promise<void> => {
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
        res.status(500).json({ error: error })
    }

}
export const get_Onecompany = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params
        console.log(id);
        const data = await Onecompany_service(id)
        if (!data) {
            res.status(404).json({ message: "data not found" })
        }
        else {
            res.status(200).json({ messag: data })
        }
    }
    catch (error) {
        res.status(500).json({ error: error })
    }

}