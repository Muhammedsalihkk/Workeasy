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
exports.gettallcompany_service = void 0;
const company_schema_1 = require("../models/company_schema");
const gettallcompany_service = (skip, limit, search, status, Rfromdate, Rendate, Sfromdate, Sendate) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const query = {
            legalname: { $regex: search, $options: "i" },
        };
        if (status) {
            query.status = status;
        }
        if (Rfromdate || Rendate) {
            query.date = {};
            if (Rfromdate) {
                query.date.$gte = Rfromdate;
            }
            if (Rendate) {
                query.date.$lte = Rendate;
            }
        }
        const companies_data = yield company_schema_1.company_model.find(query, { legalname: 1, date: 1, status: 1 }).skip(skip).limit(limit);
        return companies_data;
    }
    catch (error) {
        throw error;
    }
});
exports.gettallcompany_service = gettallcompany_service;
