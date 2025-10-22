// middleware/auth.middleware.ts
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface AuthRequest extends Request {
  user?: any;
  cookies: { [key: string]: string };
}

export const loginCheck = (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const token = req.cookies?.token; // 'token' is the cookie name

    if (!token) {
      return res.status(401).json({ message: "Login required" });
    }

    const secret = process.env.JWT_SECRET as string;

    if (!secret) {
      throw new Error("JWT secret not configured");
    }

    const decoded = jwt.verify(token, secret);
    req.user = decoded; // Store decoded user data in request

    next();
  } catch (error: any) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};
