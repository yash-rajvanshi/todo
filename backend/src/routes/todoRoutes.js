import express from "express";
import { getTodo } from "../controllers/todoController";

const router = express.Router();

router.get('/', getTodo);

export default router;