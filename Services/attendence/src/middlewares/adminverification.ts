import { Request, Response, NextFunction } from "express";
import jwt from 'jsonwebtoken'
import secret_data from "../confiq/data";

const adminverify = (req: Request, res: Response, next: NextFunction) => {
    console.log("hello");

    const { token } = req.cookies
    if (!token) {
         res.status(401).json({ message: "un authrized" })
    }
    else{

          try {
        const decode: any = jwt.verify(token, secret_data.jwt_token)
        if (decode) {
            if (decode.role != "companyadmin") {
                 res.status(403).json({ message: "access restricted" })
            }
            else {
                res.locals.user_id = decode.userId
                res.locals.company_id = decode.company_id
                next()
            }
        }
        else {
             res.status(401).json({ message: "invalid token" })
        }
    }
    catch (error) {
        console.log(error);

    }
    }

  
}
export default adminverify 