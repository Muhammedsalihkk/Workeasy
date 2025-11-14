import { StockModel } from "../models/stockSchema";
import { stock } from "../type";

export const registerService = async (data: stock) => {
  const response=await StockModel.create(data);
  if(!response) throw new Error("registration fiald")
  return response
};

export const getOneService = async (id: string) => {
  const stock = await StockModel.findOne({ _id: id, isDeleted: false });
  if (!stock) {
    throw new Error("Stock not found");
  }
  return stock;
};

export const getAllByCompanyService = async (companyId: string) => {
  const stocks = await StockModel.find({ companyId, isDeleted: false });
  if (!stocks || stocks.length === 0) {
    throw new Error("No stock added for this company");
  }
  return stocks;
};

export const getAllService = async (companyId?: string) => {
  const filter: any = { isDeleted: false };
  if (companyId) filter.companyId = companyId;
  const stocks = await StockModel.find(filter);
  return stocks;
};

export const updateService = async (id: string, data: Partial<stock>) => {
  const updatedStock = await StockModel.findOneAndUpdate({ _id: id, isDeleted: false }, data, { new: true });
  if (!updatedStock) {
    throw new Error("Stock not found for update");
  }
  return updatedStock;
};

export const softDeleteService = async (id: string) => {
  const deletedStock = await StockModel.findOneAndUpdate({ _id: id, isDeleted: false }, { isDeleted: true }, { new: true });
  if (!deletedStock) {
    throw new Error("Stock not found for deletion");
  }
  return deletedStock;
};

