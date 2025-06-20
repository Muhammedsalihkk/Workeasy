import { Schema, model } from "mongoose";
import { owner } from "../interfaces/interface";

const userschema = new Schema({
    company_id: { type: String, required: true },
    name: { type: String, required: true, index: true },
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    number: { type: String, required: true, unique: true },
    role: { type: String, required: true },
    company_role: { type:String, required: true }

})

export const employeemodel = model<owner>("employees", userschema)