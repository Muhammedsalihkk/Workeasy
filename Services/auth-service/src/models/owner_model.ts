import { Schema, model } from "mongoose";
import { owner } from "../interfaces/interface";

const userschema = new Schema({
    company_id: { type: String, required: true },
    img:{type:String},
    name: { type: String, required: true, index: true },
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    number: { type: String, required: true, unique: true },
    role: { type: String, default: "companyadmin" }

})

export const ownermodel = model<owner>("owners", userschema)