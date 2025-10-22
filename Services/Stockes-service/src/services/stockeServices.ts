import { StockModel } from "../models/stockSchema";
import { stock } from "../type";

export const registerService = async (data: stock) => {
  const response=await StockModel.create(data);
  if(!response) throw new Error("registration fiald")
  return response
};

export const getOneService = async (id: string) => {
  const stock = await StockModel.findById(id);
  if (!stock) {
    throw new Error("Stock not found");
  }
  return stock;
};

export const getAllByStockAndCompanyService = async (stockId: string, companyId: string) => {
  const stocks = await StockModel.find({ _id: stockId, companyId });
  if (!stocks || stocks.length === 0) {
    throw new Error("No stock added");
  }
  return stocks;
};

export const updateService = async (id: string, data: Partial<stock>) => {
  const updatedStock = await StockModel.findByIdAndUpdate(id, data, { new: true });
  if (!updatedStock) {
    throw new Error("Stock not found for update");
  }
  return updatedStock;
};

export const deleteService = async (id: string) => {
  const deletedStock = await StockModel.findByIdAndDelete(id);
  if (!deletedStock) {
    throw new Error("Stock not found for deletion");
  }
  return deletedStock;
};

