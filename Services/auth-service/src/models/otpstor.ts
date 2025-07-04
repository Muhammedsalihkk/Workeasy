import mongoose from "mongoose";

  const otpSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    otp: { type: String, required: true },
    expiresAt: { type: Date, default: Date.now, expires: 0 } 
  });
export const otp_model=mongoose.model("otp",otpSchema)