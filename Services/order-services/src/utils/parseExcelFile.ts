import XLSX from 'xlsx'
import { IOrder } from '../types/ordertypes'
export const parseExcelFile = async (filePath: string): Promise<Partial<IOrder>[]> => {
  const workbook = XLSX.readFile(filePath);
  const sheetName = workbook.SheetNames[0];
  const sheet = workbook.Sheets[sheetName];
  const data = XLSX.utils.sheet_to_json(sheet); 
  return data as Partial<IOrder>[]; 
};