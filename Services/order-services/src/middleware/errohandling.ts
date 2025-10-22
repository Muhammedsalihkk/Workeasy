import { NextFunction,Response} from "express";
import { AuthRequest, CustomError } from "../types/ordertypes";

// Error-handling middleware
const errorHandler = (err:CustomError, req:AuthRequest, res:Response, next:NextFunction) => {
  console.error("Error:", err.message); // Log error for debugging

  // Default status code
  const statusCode = err.statusCode||500

  res.status(statusCode).json({
    success: false,
    message: err.message || "Server Error",
    stack: process.env.NODE_ENV === "production" ? null : err.stack, // hide in production
  });
};

export default errorHandler;
