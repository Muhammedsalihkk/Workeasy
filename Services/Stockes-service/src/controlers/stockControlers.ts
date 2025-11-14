// controllers/stock.controller.ts
import { Request, Response } from "express";
import {
  registerService,
  getOneService,
  getAllByCompanyService,
  getAllService,
  updateService,
  softDeleteService,
} from "../services/stockeServices";
import { stockValidationSchema } from "../validation/stockValidation";
import { stock } from "../type";

export const registerStock = async (req: Request, res: Response) => {
  try {
    const {error}=stockValidationSchema.validate(req.body)
    if(error) throw new Error(error.details[0].message)
    const stock:stock=req.body
    const response = await registerService(req.body);
    res.status(201).json(response);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const getStockById = async (req: Request, res: Response) => {
  try {
    const stock = await getOneService(req.params.id);
    res.status(200).json(stock);
  } catch (error: any) {
    res.status(404).json({ message: error.message });
  }
};

export const getStocksByCompany = async (req: Request, res: Response) => {
  try {
    const { companyId } = req.params;
    const stocks = await getAllByCompanyService(companyId);
    res.status(200).json(stocks);
  } catch (error: any) {
    res.status(404).json({ message: error.message });
  }
};

export const getAllStocks = async (req: Request, res: Response) => {
  try {
    const { companyId } = req.query;
    const stocks = await getAllService(companyId as string | undefined);
    res.status(200).json(stocks);
  } catch (error: any) {
    res.status(404).json({ message: error.message });
  }
};

export const updateStock = async (req: Request, res: Response) => {
  try {
    const updatedStock = await updateService(req.params.id, req.body);
    res.status(200).json(updatedStock);
  } catch (error: any) {
    res.status(404).json({ message: error.message });
  }
};

export const deleteStock = async (req: Request, res: Response) => {
  try {
    const deletedStock = await softDeleteService(req.params.id);
    res.status(200).json(deletedStock);
  } catch (error: any) {
    res.status(404).json({ message: error.message });
  }
};
