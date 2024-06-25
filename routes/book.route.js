import express from "express";
import BookController from "../controllers/book.controller.js";
import { authorize } from '../util/auth.middleware.js'

const router = express.Router();

router.post("/", authorize('admin'),BookController.createBook);
router.put("/", authorize('admin'),BookController.updateBook);
router.get("/", authorize('admin', 'customer1'),BookController.getBooks);
router.get("/info", authorize('admin'),BookController.getBooksInfo);
router.get("/:id", authorize('admin', 'customer1'),BookController.getBook);
router.delete("/:id", authorize('admin'),BookController.deleteBook);

router.post("/info", authorize('admin'), BookController.createBookInfo);
router.put("/info", authorize('admin'), BookController.updateBookInfo);
router.delete("/info/:id", authorize('admin'), BookController.deleteBookInfo);

router.post("/info/:id/evaluation", authorize('admin','customer1') ,BookController.createBookEvalution);
router.delete('/info/:id/evaluation/:index',authorize('admin'), BookController.deleteBookEvaluation);





export default router;