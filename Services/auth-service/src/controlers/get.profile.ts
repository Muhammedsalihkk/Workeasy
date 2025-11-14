import { NextFunction,Request,Response } from "express"
import { getUserProfile } from "../services/userProfile_service";
import { AuthRequest } from "../interfaces/interface";
export const getOwnUserProfileController = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const userId = req.user?.userId;  
    if (!userId) {
      res.status(401).json({ success: false, message: "Unauthorized" });
      return;
    }

    const userProfile = await getUserProfile(userId);

    if (!userProfile) {
      res.status(404).json({ success: false, message: "User not found" });
      return;
    }

    res.status(200).json({ success: true, data: userProfile });
  } catch (error: any) {
    console.error("Error fetching own user profile:", error);
    next(error);
  }
};

export const getEmployeeProfileController = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const userId = req.params.id;

    
    if (!userId) {
      res.status(400).json({ success: false, message: "User ID is required" });
      return;
    }

    const userProfile = await getUserProfile(userId);
    if (!userProfile) {
      res.status(404).json({ success: false, message: "User not found" });
      return;
    }

    res.status(200).json({ success: true, data: userProfile });
  } catch (error: any) {
    console.error("Error fetching employee profile:", error);
    next(error);
  }
};

       
