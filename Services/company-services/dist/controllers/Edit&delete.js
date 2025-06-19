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
exports.deletcompany = exports.editcompany = void 0;
const editcompany_1 = require("../services/editcompany");
const editcompany = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updateddata = req.body;
        const { id } = req.params;
        const result = yield (0, editcompany_1.editcompany_services)(id, updateddata);
        if (result) {
            res.status(200).json({ message: result });
        }
        else {
            res.status(404).json({ error: "editing failed" });
        }
    }
    catch (error) {
        res.status(500).json({ error: error });
    }
});
exports.editcompany = editcompany;
const deletcompany = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const result = yield (0, editcompany_1.delete_services)(id);
        res.status(200).json({ message: result });
    }
    catch (error) {
        res.status(500).json({ error: error });
    }
});
exports.deletcompany = deletcompany;
