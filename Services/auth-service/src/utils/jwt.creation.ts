import  jwt  from "jsonwebtoken"
import { configdata } from "../config/congration"

export const jwt_creation=(payload:object)=>{
        const token=jwt.sign(payload,configdata.JSON_secret,{expiresIn:'1d'})
        return token

}
export const jwt_verify=(token:String)=>{
        const user_data=jwt.verify(token as string,configdata.JSON_secret)           
        return user_data  
}