import { Request, Response, NextFunction } from "express";
import jwt from 'jsonwebtoken'
import secret_data from "../confiq/data";

const authverify = (req: Request, res: Response, next: NextFunction) => {
    const { token } = req.cookies
    if (!token) {
        res.status(401).json({ message: "un authrized" })
    }
    else{
         try {
        const decode:any = jwt.verify(token, secret_data.jwt_token)
        
        if (decode) {
            res.locals.user_id = decode.
            res.locals.company_id = decode.company_id
            next()
        }
        else{
            res.status(401).json({message:"invalid token"})
        }
    }
    catch(error){
        console.log(error);
        
    }
    }
   
}
export default authverify 