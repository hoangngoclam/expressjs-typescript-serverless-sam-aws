import express from "express";
import { createTodo, deleteTodo, getTodoById, getTodos, updateTodo } from "../controllers/todo.controllers";

const router = express.Router();

router.post("/", createTodo);
router.get("/", getTodos);
router.get("/:id", getTodoById);
router.put("/:id", updateTodo);
router.delete("/:id", deleteTodo);

export default router;
