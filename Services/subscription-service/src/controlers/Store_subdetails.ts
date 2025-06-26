import { NextFunction, Request, Response } from "express";
import { sub_data_validation } from "../middlewares/Datavalidation";
import { add_subdetials_service } from "../services/add.sub_details";
import { send_message } from "../confiq/Rabitmq.connection";

export const sub_data_posting = async (req: Request, res: Response, next: NextFunction) => {

    try {
        const { error } = sub_data_validation.validate(req.body)
        if (error) {
            const err: any = new Error(error.details[0].message)
            err.code = 404
            throw err
        }
        const data:any=await add_subdetials_service(req.body)
        if(data)
        {
            const result:string=await send_message({id:req.body.company_id,plan_type:req.body.plan_type,plan_end:req.body.plan_end})
            console.log("response from quue",result);
            
            if(result=="success")
            {
                res.status(200).json({message:"ok"})
            }
            else{
                throw "fild to queue message"
            }
        }
    }
    catch (error) {
        next(error)
    }


}