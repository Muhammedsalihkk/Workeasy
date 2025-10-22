import Order from "../models/order-Models";
import { IOrder } from "../types/ordertypes";
import { parseExcelFile } from "../utils/parseExcelFile";

export const fetchAllOrders = async (
  company_id: string,
  filters?: {
    status?: string;
    paymentStatus?: string;
    createdFrom?: Date;
    createdTo?: Date;
    deliveryFrom?: Date;
    deliveryTo?: Date;
    page?: number;
    limit?: number;
  }
): Promise<{
  data: IOrder[];
}> => {
  const query: any = { company_id };

  if (filters?.status) query.status = filters.status;

  if (filters?.paymentStatus) query.paymentStatus = filters.paymentStatus;

  if (filters?.createdFrom || filters?.createdTo) {
    query.createdAt = {};
    if (filters.createdFrom) query.createdAt.$gte = filters.createdFrom;
    if (filters.createdTo) query.createdAt.$lte = filters.createdTo;
  }
  if (filters?.deliveryFrom || filters?.deliveryTo) {
    query.deliveryDate = {};
    if (filters.deliveryFrom) query.deliveryDate.$gte = filters.deliveryFrom;
    if (filters.deliveryTo) query.deliveryDate.$lte = filters.deliveryTo;
  }
  const page = filters?.page || 1;
  const limit = filters?.limit || 10;
  const skip = (page - 1) * limit;
  const data = await Order.find(query)
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);

  return { data };
};
export const fetchOrderById = async (id: string): Promise<IOrder | null> => {
  return await Order.findById(id);
};

// Service function to create order
export const addOrder = async (data: Partial<IOrder>): Promise<IOrder> => {
  const newOrder = new Order(data);
  return await newOrder.save();
};
export const bulkOrderadd = async (
  filepath: string,
  orgId: string,
  userid: string
) => {
  const excelData: Partial<IOrder>[] = await parseExcelFile(filepath);
  const bulkData: Partial<IOrder>[] = excelData.map((row: Partial<IOrder>) => ({
    ...row,
    company_id: orgId,
    createdBy: userid,
    createdAt: new Date(),
  }));
  const insertedOrders = await Order.insertMany(bulkData);
  return insertedOrders
};
export const modifyOrder = async (
  id: string,
  data: Partial<IOrder>
): Promise<IOrder | null> => {
  return await Order.findByIdAndUpdate(id, data, { new: true });
};

// Service function to delete order
export const removeOrder = async (id: string): Promise<IOrder | null> => {
  return await Order.findByIdAndUpdate(id, { isDelete: true });
};
