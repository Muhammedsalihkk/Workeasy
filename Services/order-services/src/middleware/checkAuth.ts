import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import confiqdata from "../confiq/configration";
import { AuthRequest } from "../types/ordertypes";

export const checkAuth = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
   
    const token = (req.cookies.token || "").trim()


    if (!token) {
      return res
        .status(401)
        .json({ message: "Unauthorized: No token provided" });
    }
    const secretKey = (confiqdata.JWT_Secret||'').trim() 
     console.log(token);
  
    const decoded = jwt.verify(token, secretKey);
   
  
    console.log(decoded);
    
    req.user = decoded; // attach decoded payload to request
    next();
  } catch (err) {
    console.log(err);
    
    return res
      .status(401)
      .json({ message: "Unauthorized: Invalid token", error: err });
  }
};
