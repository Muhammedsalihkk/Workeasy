import jwt from "jsonwebtoken";
import { configdata } from "../config/env";
import { Request, Response, NextFunction } from "express";
import { AuthRequest } from "../interface/company.interface";

export const owner_autherization = (
  req:AuthRequest ,
  res: Response,
  next: NextFunction
): void => {
  console.log(req.cookies);

  const { token } = req.cookies;
  if (!token) {
    res.status(401).json({ message: "unauthrized" });
    return;
  }
  try {
    const encoded: any = jwt.verify(token, configdata.JWT_TOEKN);
    req.user = encoded;
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid or expired token" });
    return;
  }
};
export const issuper_admin = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const { token } = req.cookies;
  if (!token) {
    res.status(401).json({ message: "unauthrized" });
    return;
  }
  try {
    const encoded: any = jwt.verify(token, configdata.JWT_TOEKN);
    if (encoded.role != "superadmin") {
      res.status(403).json({ message: "access denied to this url" });
      return;
    } else {
      res.locals.user_id = encoded.userId;
      res.locals.role = encoded.role;
      next();
    }
  } catch (error) {
    res.status(401).json({ message: "Invalid or expired token" });
    return;
  }
};
