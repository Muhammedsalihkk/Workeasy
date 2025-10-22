import { Router } from "express";
import { bulkorderInsertion, createOrder, deleteOrder, getAllOrders, getOrderById, updateOrder } from "../controllers/orderontroler"

import multer from "multer";
import { checkAuth } from "../middleware/checkAuth";

const router = Router();
const upload=multer({dest:'uploads/'})
// CRUD routes
router.get("/orders", getAllOrders);
router.get("/orders/:id", getOrderById);
router.post('/bulkorder',checkAuth,upload.single("file"),bulkorderInsertion)
router.post("/orders", createOrder);
router.put("/orders/:id", updateOrder);
router.delete("/:id", deleteOrder);

export default router;