"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.company_model = void 0;
const mongoose_1 = require("mongoose");
function getdate() {
    const today = new Date();
    return new Date(today.getFullYear(), today.getMonth(), today.getDate());
}
const companyschema = new mongoose_1.Schema({
    legalname: { type: String, required: true, index: true },
    date: { type: String, required: true },
    tradingname: { type: String, required: true },
    registration_number: { type: Number, required: true },
    company_type: { type: String, required: true },
    primary_industry: { type: String, required: true },
    annual_revanue: { type: Number },
    phonenumber: { type: Number, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    logo: { type: String },
    status: { type: String, default: "active" },
    address: {
        place: { type: String, require: true },
        pin: { type: Number, require: true },
        distict: { type: String, require: true },
        state: { type: String, require: true },
    }
});
exports.company_model = (0, mongoose_1.model)("companydbs", companyschema);
