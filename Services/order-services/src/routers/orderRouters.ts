import { Router } from "express";
import { bulkorderInsertion, createOrder, deleteOrder, getAllOrders, getOrderById, massEditTransactions, updateOrder } from "../controllers/orderontroler"

import multer from "multer";
import { checkAuth } from "../middleware/checkAuth";

const router = Router();
const upload=multer({dest:'uploads/'})
// CRUD routes
router.use(checkAuth)
router.get("/orders/getAllorders", getAllOrders);
router.get("/orders/:id", getOrderById);
router.post('/orders/bulkorder',checkAuth,upload.single("file"),bulkorderInsertion)
router.post("/orders/neworders", createOrder);
router.put("/orders/:id", updateOrder);
router.patch('/orders/orderBulk',massEditTransactions)
router.delete("/orders/:id", deleteOrder);

export default router;