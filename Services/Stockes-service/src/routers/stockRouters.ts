import express from "express";
import {
	registerStock,
	getStockById,
	getStocksByCompany,
	getAllStocks,
	updateStock,
	deleteStock,
} from "../controlers/stockControlers";
import { loginCheck } from "../middleware/checkauth";

const router = express.Router();


router.post("/stock", loginCheck, registerStock);


router.get("/stock", loginCheck, getAllStocks);


router.get("/stock/:companyId", loginCheck, getStocksByCompany);


router.get("/stock/:id", loginCheck, getStockById);


router.patch("/stock/:id", loginCheck, updateStock);


router.delete("/stock/:id", loginCheck, deleteStock);

export default router;