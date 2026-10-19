import { Request, Response, NextFunction, ErrorRequestHandler } from "express";

export const errorhadller: ErrorRequestHandler = (err: any, req: Request, res: Response, next: NextFunction): void => {
    console.log("eror", err);
    if (!err) {
        res.status(500).json({ success: false, message: "Unknown error occurred" });
        return;
    }
    if (err == 11000 || err.code == 11000) {
        const message = "Check email or phone number (both should be unique). An account with this email or phone already exists.";
        res.status(400).json({ success: false, message, error: message });
        return;
    }
    const error = err.message || "Something went wrong";
    const code = typeof err.code === "number" && err.code >= 400 && err.code <= 599 ? err.code : (err.name === "ValidationError" ? 400 : 500);
    res.status(code).json({ success: false, error });
};