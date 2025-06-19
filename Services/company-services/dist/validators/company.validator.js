"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validation_company = void 0;
const joi_1 = __importDefault(require("joi"));
exports.validation_company = joi_1.default.object({
    legalname: joi_1.default.string().required(),
    tradingname: joi_1.default.string().required(),
    registration_number: joi_1.default.number().required().max(9999999999).min(10000),
    company_type: joi_1.default.string().required(),
    primary_industry: joi_1.default.string().required(),
    annual_revanue: joi_1.default.number(),
    phonenumber: joi_1.default.number().required().max(9999999999).min(1000000000),
    email: joi_1.default.string().required(),
    date: joi_1.default.string().required(),
    logo: joi_1.default.string(),
    address: joi_1.default.object({
        place: joi_1.default.string().required(),
        pin: joi_1.default.number().required(),
        distict: joi_1.default.string().required(),
        state: joi_1.default.string().required(),
    }).required()
}).options({ convert: false });
