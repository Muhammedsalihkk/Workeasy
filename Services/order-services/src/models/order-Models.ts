import { model, Schema } from "mongoose";
import { IOrder } from "../types/ordertypes";
const orderSchema = new Schema(
  {
    customerName: { type: String, required: true },
    product: { type: String, required: true },
    quantity: { type: Number, required: true },
    status: {
      type: String,
      enum: ["pending", "completed", "cancelled"],
      default: "pending",
    },

    // Reference to Company collection
    company_id: {
      type: Schema.Types.ObjectId,
      ref: "Companies",
      required: true,
    },

    // Reference to User collection
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    updatedBy: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },

    deliveryDate: { type: Date, required: true },
    paymentStatus: {
      type: String,
      enum: ["pending", "paid", "failed"],
      default: "pending",
    },
    isDelete: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

const Order = model<IOrder>("Order", orderSchema);

export default Order;