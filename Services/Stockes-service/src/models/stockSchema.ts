import { model, Schema } from "mongoose";
import { stock } from "../type";

const stockSchema = new Schema<stock>(
  {
    companyId: {
      type: String,
      required: true,
    },
    productName: {
      type: String,
      required: true,
      trim: true,
    },
    quantity: {
      type: Number,
      required: true,
      min: 0,
    },
    batchNumber: {
      type: String,
      trim: true,
    },
    expiryDate: {
      type: Date,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true, 
  }
);

export const StockModel = model<stock>("Stock", stockSchema);