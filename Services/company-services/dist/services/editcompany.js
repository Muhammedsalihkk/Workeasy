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
exports.delete_services = exports.editcompany_services = void 0;
const company_schema_1 = require("../models/company_schema");
const editcompany_services = (id, updateddata) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updated = yield company_schema_1.company_model.findByIdAndUpdate(id, updateddata, {
            new: true,
            runValidators: true
        });
        return updated;
    }
    catch (error) {
        throw error;
    }
});
exports.editcompany_services = editcompany_services;
const delete_services = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield company_schema_1.company_model.findByIdAndDelete(id);
        return !!data;
    }
    catch (error) {
        throw error;
    }
});
exports.delete_services = delete_services;
