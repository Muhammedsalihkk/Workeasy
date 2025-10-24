import { NextFunction, Request, response, Response } from "express";
import { send_message } from "../config/rabitmq";
import { activities_model } from "../models/Activities";
import { uploadFile } from "../middlewares/fileupload";
import { deleteUser, UserEdit } from "../services/userProfile_service";


export const edit_user = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Assign updation_id from logged-in user
    req.body.updation_id = res.locals.user_id;

    
    if (req.file?.path) {
      const imgUrl = await uploadFile(req.file.path);
      req.body.img = imgUrl;
    }

    
    const userId = req.query.id ? String(req.query.id) : res.locals.user_id;
    req.body.updation_id=userId
    
    const updatedUser = await UserEdit(req.body);

    // Optionally send message/notification
    if (updatedUser) {
      await send_message({ userId, message: "Profile updated successfully" });
    }

    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      data: updatedUser,
    });
  } catch (error: any) {
    console.error("Error editing profile:", error);
    next(error);
  }
};


export const deleteUserProfile = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.params.id;

    if (!userId) {
      return res.status(400).json({ success: false, message: "User ID is required" });
    }

    const deleted = await deleteUser(userId);

    if (!deleted) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    res.status(200).json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (error: any) {
    console.error("Error deleting user:", error);
    next(error);
  }
};

export const user_logout= async (req:Request,res:Response,next:NextFunction)=>{
        res.clearCookie("token")
        res.status(200).json({message:"logout successfully completed"})
}