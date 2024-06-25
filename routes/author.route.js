import express from "express";
import AuthorController from "../controllers/author.controller.js";
import { authorize } from '../util/auth.middleware.js'

const router = express.Router();

router.post("/", authorize('admin'), AuthorController.createAuthor);
router.get("/", authorize('admin'), AuthorController.getAuthors);
router.get("/:id", authorize('admin'), AuthorController.getAuthor);
router.delete("/:id", authorize('admin'), AuthorController.deleteAuthor);
router.put("/", authorize('admin'), AuthorController.updateAuthor);

export default router;