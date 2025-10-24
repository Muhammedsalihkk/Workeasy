import { NextFunction, Request, Response } from "express";
import { authData_validation } from "../middlewares/datavalidation";
import { authentication } from "../services/userLogin_service";


export const userLogin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { error } = authData_validation.validate(req.body);
    if (error) {
      const err: any = new Error(error.details[0].message);
      err.code = 404;
      throw err;
    } else {
      const response: any = await authentication(req.body);
      res.cookie("token", response, {
        httpOnly: true,
        secure: false,
        maxAge: 60 * 60 * 1000,
      });
      res.status(200).json({ message: "success" });
    }
  } catch (error) {
    next(error);
  }
};
