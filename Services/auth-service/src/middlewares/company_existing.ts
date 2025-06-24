
import axios from "axios"
import { Request,Response,NextFunction } from "express"

export const is_blocked=async(id:string)=>{
           const respons:any= await axios.get(`http://company-service:3000/api/companies/${id}`)
           console.log(respons);
           
           return respons.data.message.block
           
}