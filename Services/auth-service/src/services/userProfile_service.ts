import { activities_model } from "../models/Activities";
import { UserModel } from "../models/userModel";

import { add_activity } from "./Addtoactivity";

export const UserEdit = async (user_data: any) => {
  try {
    const respons = await UserModel.findByIdAndUpdate(
      user_data.updation_id,
      { ...user_data },
      { new: true, runValidators: true }
    ).select("-password");
    console.log(user_data.updation_id);

    const update = await add_activity(user_data.updation_id, "profile Edited");
    return respons;
  } catch (error: any) {
    console.log(error.code);

    throw error.code;
  }
};
export const getUserProfile = async (userId: string) => {
  try {
    const user = await UserModel.findById(userId).lean();

    return user;
  } catch (error) {
    console.error("Error in getUserProfile:", error);
    throw error;
  }
};

export const deleteUser = async (userId: string): Promise<boolean> => {
  try {
    const result = await UserModel.findByIdAndDelete(userId);

    return result ? true : false;
  } catch (error) {
    console.error("Error deleting user:", error);
    throw error;
  }
};
