import { Response, NextFunction } from "express";
import {
  addOrder,
  bulkOrderadd,
  fetchAllOrders,
  fetchOrderById,
  massUpdateTransactions,
  modifyOrder,
  removeOrder,
} from "../services/services";
import { AuthRequest } from "../types/ordertypes";

export const getAllOrders = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
  
    const token:string=req.cookies.token
    
    const orders = await fetchAllOrders(req.user.company_id,token,req.query);
    res.status(200).json(orders);
  } catch (err:any) {
    console.log(err.message)
    next({ status: 500, message: "Failed to fetch orders", error: err });
  }
};

export const getOrderById = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const order = await fetchOrderById(req.params.id);
    if (!order) return next({ status: 404, message: "Order not found" });
    res.status(200).json(order);
  } catch (err) {
    next({ status: 500, message: "Failed to fetch order", error: err });
  }
};

export const createOrder = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    
    req.body.company_id=req.user.company_id
    req.body.createdBy=req.user.userId
    const newOrder = await addOrder(req.body);
    res.status(201).json(newOrder);
  } catch (err: any) {
    console.log(err.message);
    
    next({ status: 500, message: "Failed to Create order", error: err });
  }
};

export const bulkorderInsertion =async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.file) throw new Error("no file upload");
    const filepath = req.file.path;
    const bulkOrder=await bulkOrderadd(filepath,req.user.userId,req.user.company_id)
    res.status(200).json("insertion completed")
  } catch (err: any) {
    next({ status: 500, message: err.message, error: err });
  }
};

export const massEditTransactions = async (req:AuthRequest, res:Response,next:NextFunction) => {
  try {
    const { ids, updates } = req.body;
    const result = await massUpdateTransactions(ids, updates);

    res.status(200).json({
      message: `Updated ${result.modifiedCount} transactions successfully`,
    });
  } catch (error:any) {
   
    next({ status: 500, message: error.message, error: error })
  }
};
export const updateOrder = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const updatedOrder = await modifyOrder(req.params.id, req.body);
    if (!updatedOrder) return next({ status: 404, message: "Order not found" });
    res.status(200).json(updatedOrder);
  } catch (err: any) {
    next({ status: 500, message: err.message, error: err });
  }
};

export const deleteOrder = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const deletedOrder = await removeOrder(req.params.id);
    if (!deletedOrder) return next({ status: 404, message: "Order not found" });
    res.status(204).send();
  } catch (err) {
    next({ status: 500, message: "Failed to delete order", error: err });
  }
};
