import express from "express";
import { createTodo, deleteTodo, getTodo, updateTodo } from "../controllers/todoController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get('/', protect , getTodo);
router.post('/', protect, createTodo);
router.delete('/:id', protect, deleteTodo);
router.put('/:id', protect, updateTodo);

export default router;