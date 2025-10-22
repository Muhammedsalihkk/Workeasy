import { User } from "../interfaces/interface";
import { UserModel } from "../models/userModel";

import { hasspassword } from "../utils/hasing";

export const owner_registration = async (userdata: User): Promise<any> => {
  try {
    if (userdata.password != userdata.confirm_password) {
      throw "password not match";
    }
    const hashedpassword = await hasspassword(userdata.password);
    userdata.password = hashedpassword;
    const user = await UserModel.create({
      ...userdata,
    });
    return user;
  } catch (error: any) {
    console.log("thi is error message", error.message);

    throw `error messag${error.message}`;
  }
};
