import { Request, Response, NextFunction } from "express";

export const errorhadller = (err: any, req: Request, res: Response, next: NextFunction) => {
    console.log("eror", typeof err);
    if (err == 11000||err.code==11000) {
        res.status(500).json({ success: false, message:"chack email or number(both should be unique)" })
    }
    else {
        const error = err.message || "somthisng wrong"
        const code = err.code || 500
        res.status(code).json({ success: false, error })
    }

}