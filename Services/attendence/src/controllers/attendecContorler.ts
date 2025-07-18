import { Request, Response } from "express"
import { Check_in, check_out } from "../services/attendenceServiec"
import { file_register } from "../services/register"

export const attendence_registration = async (req: Request, res: Response) => {
    try {
        const image_path = req.file?.path
        const id = req.params.id
        if (!id) throw new Error("employee id is required")
        if (image_path) {
            const response = await file_register(id, image_path)
            res.status(200).json({ response })
        }
        else {
            throw "image is required"
        }
    }
    catch (err: any) {
        res.status(500).json({ message: err.message })
    }

}
export const Clock_in = async (req: Request, res: Response) => {
    try {
        const user_id=req.params.id
        const {company_id}=res.locals
        const file = req.file?.path
        console.log("hello")
        
        if (!file) {
            throw new Error("image is required")
        }
        const result = await Check_in(user_id,company_id ,file)
        res.status(200).json({result})
    }
    catch (error:any) {
        console.log(error);
        
            res.status(500).json({message:error.message})
    }
}
export const Clock_out=async(req:Request,res:Response)=>{
    try{
        //  const {user_id}=res.locals
        const user_id=req.params.id
        const response=await check_out(user_id)
        res.status(200).json({message:response})
    }
    catch(error:any){
        res.status(500).json({message:error.message})
    }


}
export const attendenceByuser = (req: Request, res: Response) => {

}
export const attendenceAllBycompany = (req: Request, res: Response) => {

}
