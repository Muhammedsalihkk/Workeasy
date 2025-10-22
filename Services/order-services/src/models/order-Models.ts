import { model, Schema } from "mongoose";
import { IOrder } from "../types/ordertypes";

const orderSchema = new Schema<IOrder>(
  {
    customerName: { type: String, required: true },
    product: { type: String, required: true },
    quantity: { type: Number, required: true },
    status: {
      type: String,
      enum: ["pending", "completed", "cancelled"],
      default: "pending",
    },
    company_id: { type: String, required: true },
    createdBy: { type: String },
    updatedBy: { type: String },

    // ✅ New fields
    deliveryDate: { type: Date, required: true }, // delivery date is required
    paymentStatus: {
      type: String,
      enum: ["pending", "paid", "failed"], // only these values allowed
      default: "pending",
    },
    isDelete:{type:Boolean,default:false}
  },
  {
    timestamps: true, 
  }
);

const Order = model<IOrder>("Order", orderSchema);

export default Order;