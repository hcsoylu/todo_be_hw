import express from "express";
import {
  getMyTodos,
  editMyTodo,
  deleteMyTodo,
  createMyTodo,
  getOneTodo,
} from "../controllers/todoControllers.js";

const router = express.Router();

router.get("/mytodos", getMyTodos);
router.post("/mytodos", createMyTodo);
router.get("/mytodos/:id", getOneTodo);
router.patch("/mytodos/:id", editMyTodo);
router.delete("/mytodos/:id", deleteMyTodo);

export default router;
