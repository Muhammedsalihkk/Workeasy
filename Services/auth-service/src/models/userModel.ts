import { Schema, model } from "mongoose";
import { User } from "../interfaces/interface";

const userschema = new Schema<User>({
  company_id: { type: String, required: true },
  img: { type: String },
  company_role: {
    type: String,
    enum: ["Admin", "Employee"],
    required: true,
  },
  employee_id: {
    type: String,
    required: function () {
      return this.company_role !== "Admin";
    },
  },
  dob: {
    type: String,
    required: function () {
      return this.company_role !== "Admin";
    },
  },
  shift: {
    type: {
      type: String,
      enum: ["Morning", "Evening", "Night", "Flexible"],
      required: function () {
        return this.company_role !== "Admin";
      },
    },
    startTime: {
      type: String,
      required: function () {
        return this.company_role !== "Admin";
      },
    },
    endTime: {
      type: String,
      required: function () {
        return this.company_role !== "Admin";
      },
    },
  },

  join_date: {
    type: String,
    required: function () {
      return this.company_role !== "Admin";
    },
  },
  name: { type: String, required: true, index: true },
  gender: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String, required: true, unique: true, index: true },
  number: { type: String, required: true },

  department: {
    type: String,
    enum: [
      "StockDepartment",
      "SalesDepartment",
    ],
    required: function () {
      return this.company_role !== "Admin";
    },
  },

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
