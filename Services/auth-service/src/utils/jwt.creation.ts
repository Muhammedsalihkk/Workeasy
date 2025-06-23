import  jwt  from "jsonwebtoken"
import { configdata } from "../config/congration"

export const jwt_creation=async(payload:object):Promise<any>=>{
        const token=jwt.sign(payload,configdata.JSON_secret,{expiresIn:'1d'})
        return token

}