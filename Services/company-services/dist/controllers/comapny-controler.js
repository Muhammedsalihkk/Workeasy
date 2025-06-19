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
exports.register_company = void 0;
const register_service_1 = require("../services/register_service");
const company_validator_1 = require("../validators/company.validator");
const register_company = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { error } = company_validator_1.validation_company.validate(req.body);
        if (error) {
            res.status(500).json({ error: error.details[0].message });
            return;
        }
        const companydata = req.body;
        const result = yield (0, register_service_1.register_service)(companydata);
        if (result == "success") {
            res.status(200).json({ message: result });
        }
        else {
            res.status(400).json({ error: result });
        }
    }
    catch (error) {
        res.status(500).json({ error: error });
    }
});
exports.register_company = register_company;
