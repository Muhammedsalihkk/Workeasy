import { Document } from "mongoose";
import {Request} from 'express'
export interface IOrder extends Document {
  customerName: string;
  product: string;
  quantity: number;
  status?: "pending" | "completed" | "cancelled";
  company_id: string;
  createdBy?: string;
  updatedBy?: string;
  deliveryDate: Date;
  paymentStatus?: "pending" | "paid" | "failed";
  createdAt?: Date;
  updatedAt?: Date;
  isDelete:boolean
}
export interface CustomError extends Error {
  statusCode?: number;
}
export interface AuthRequest extends Request {
  user?: any; // you can replace `any` with a proper User type
}