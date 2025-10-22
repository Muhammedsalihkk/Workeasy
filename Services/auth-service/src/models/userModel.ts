import { Schema, model } from "mongoose";
import { User } from "../interfaces/interface";

const userschema = new Schema<User>({
  company_id: { type: String, required: true },
  img: { type: String },
  employee_id: { type: String },
  dob: { type: String },
  shift: { type: String },
  join_date: { type: String },
  name: { type: String, required: true, index: true },
  gender: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String, required: true, unique: true, index: true },
  number: { type: String, required: true },
  company_role: {
    type: String,
    enum: ["Admin", "StockDepartment", "SalesDepartment"],
    required: true,
  },
  department: { type: String, required: true },
  status: { type: String, default: "active" },
  qualification: { type: String, required: true },
  Address: {
    place: { type: String },
    pin: { type: Number },
    distct: { type: String },
    state: { type: String },
  },
});


export const UserModel = model<User>("user", userschema);
