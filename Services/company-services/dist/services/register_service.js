"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.register_service = void 0;
const company_schema_1 = require("../models/company_schema");
const register_service = (companydata) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { address } = companydata;
        yield company_schema_1.company_model.create({
            legalname: companydata.legalname,
            tradingname: companydata.tradingname,
            registration_number: companydata.registration_number,
            company_type: companydata.company_type,
            primary_industry: companydata.primary_industry,
            annual_revanue: companydata.annual_revanue,
            phonenumber: companydata.phonenumber,
            email: companydata.email,
            date: companydata.date,
            address: {
                place: address.place,
                pin: address.pin,
                distict: address.distict,
                state: address.state
            }
        });
        return "success";
    }
    catch (error) {
        return `error message ${error.message}`;
    }
});
exports.register_service = register_service;
