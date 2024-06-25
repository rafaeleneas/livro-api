import express from "express";
import SaleController from "../controllers/sale.controller.js";
import { authorize } from '../util/auth.middleware.js'

const router = express.Router();

router.post("/", authorize('admin', 'customer1'), SaleController.createSale);
router.get("/", authorize('admin'), SaleController.getSales);
router.get("/:id", authorize('admin', 'customer1'), SaleController.getSale);
router.delete("/:id",authorize('admin'), SaleController.deleteSale);
router.put("/",authorize('admin'), SaleController.updateSale);

export default router;