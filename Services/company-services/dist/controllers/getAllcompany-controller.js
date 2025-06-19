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
exports.get_Onecompany = exports.getallcompany = void 0;
const getAllcompany_service_1 = require("../services/getAllcompany_service");
const getOnecompany_service_1 = require("../services/getOnecompany_service");
const getallcompany = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const limit = Number(req.query.limit) || 3;
        const page = Number(req.query.page) || 1;
        const search = req.query.search || "";
        const plan = req.query.plan || "";
        const status = req.query.status || "";
        const Rfromdate = req.query.Rfromdate || "";
        const Rendate = req.query.Rendate || "";
        const Sfromdate = req.query.Sfromdate || "";
        const Sendate = req.query.Sendate || "";
        const skip = (page - 1) * limit;
        const companydata = yield (0, getAllcompany_service_1.gettallcompany_service)(skip, limit, search, status, Rfromdate, Rendate, Sfromdate, Sendate);
        res.status(200).json({ message: companydata });
    }
    catch (error) {
        res.status(500).json({ error: error });
    }
});
exports.getallcompany = getallcompany;
const get_Onecompany = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        console.log(id);
        const data = yield (0, getOnecompany_service_1.Onecompany_service)(id);
        if (!data) {
            res.status(404).json({ message: "data not found" });
        }
        else {
            res.status(200).json({ messag: data });
        }
    }
    catch (error) {
        res.status(500).json({ error: error });
    }
});
exports.get_Onecompany = get_Onecompany;
