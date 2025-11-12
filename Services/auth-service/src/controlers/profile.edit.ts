import { NextFunction, Request, response, Response } from "express";
import { send_message } from "../config/rabitmq";
import { activities_model } from "../models/Activities";
import { uploadFile } from "../middlewares/fileupload";
import { deleteUser, UserEdit } from "../services/userProfile_service";
import { AuthRequest } from "../interfaces/interface";


export const edit_user = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
        
    const userId = req.params.id || req.query.id || req.user?.userId;    
    if (!userId) {
       res.status(400).json({ success: false, message: "User ID is required" });
    }

    req.body.updation_id = userId;

    // Multer may populate req.file (single) or req.files (when using fields())
    const incomingFile: any = (req as any).file || ((req as any).files && (((req as any).files.image && (req as any).files.image[0]) || ((req as any).files.images && (req as any).files.images[0])));
    if (incomingFile && incomingFile.path) {
      console.log("file path", incomingFile.path);
      const imgUrl = await uploadFile(incomingFile.path);
      console.log("Uploaded image URL:", imgUrl);
      // Attach img URL to body so UserEdit can persist it
      req.body.img = imgUrl;
    }
    
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
    console.log("helo");
    
    const userId = req.params.id;

    if (!userId) {
      res.status(400).json({ success: false, message: "User ID is required" });
      return;
    }
   
    
    const deleted = await deleteUser(userId);

    if (!deleted) {
       res.status(404).json({ success: false, message: "User not found" });
       return;
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