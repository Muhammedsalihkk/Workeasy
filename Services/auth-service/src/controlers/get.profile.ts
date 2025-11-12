import { NextFunction,Request,Response } from "express"
import { getUserProfile } from "../services/userProfile_service";
import { AuthRequest } from "../interfaces/interface";



export const getUserProfileController = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const userId = req.params.id || req.user.userId
    if (!userId) {
      res.status(500).json({ success: false, message: "User ID is required" });
      return;
    }


    const userProfile = await getUserProfile(userId);

    if (!userProfile) {
      res.status(404).json({ success: false, message: "User not found" });
      return;
    }

    res.status(200).json({ success: true, data: userProfile });
  } catch (error: any) {
    console.error("Error fetching user profile:", error);
    next(error);
  }
};

       
