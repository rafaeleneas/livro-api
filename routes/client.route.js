import express from "express";
import ClientController from "../controllers/client.controller.js";
import { authorize } from '../util/auth.middleware.js'

const router = express.Router();

router.post("/", authorize('admin'),ClientController.createClient);
router.get("/", authorize('admin'), ClientController.getClients);
router.get("/:id", authorize('admin'),ClientController.getClient);
router.delete("/:id", authorize('admin'),ClientController.deleteClient);
router.put("/", authorize('admin'),ClientController.updateClient);

export default router;