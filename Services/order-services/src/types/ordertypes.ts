import { Document, Types } from "mongoose";
import { Request } from "express";
export interface IOrder extends Document {
  customerName: string;
  product: string;
  quantity: number;
  status?: "pending" | "completed" | "cancelled";

  // These are ObjectId references
  company_id: Types.ObjectId | string;
  createdBy?: Types.ObjectId | string;
  updatedBy?: Types.ObjectId | string;

  deliveryDate: Date;
  paymentStatus?: "pending" | "paid" | "failed";

  createdAt?: Date;
  updatedAt?: Date;
  isDelete: boolean;
}
export interface CustomError extends Error {
  statusCode?: number;
}
export interface AuthRequest extends Request {
  user?: any;
  cookies: {
    token: string;
  };
}
