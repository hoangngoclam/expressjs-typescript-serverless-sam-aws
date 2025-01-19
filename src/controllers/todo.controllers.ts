import type { Request, Response } from "express";
import type { Todo } from "../models/todo.models";
import {
  createTodoService,
  deleteTodoService,
  getTodoByIdService,
  getTodosService,
  updateTodoService,
} from "../services/todo.services";

// Create a new To-Do item
export const createTodo = async (req: Request, res: Response): Promise<void> => {
  try {
    const { uuid, title, description, completed } = req.body;

    if (!uuid || !title) {
      res.status(400).json({ error: "UUID and Title are required" });
      return;
    }

    const todo: Todo = { uuid, title, description, completed: false };
    const createdTodo = await createTodoService(todo);

    res.status(201).json({ message: "To-Do created successfully", todo: createdTodo });
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

// Get all To-Do items
export const getTodos = async (_req: Request, res: Response): Promise<void> => {
  try {
    const todos = await getTodosService();
    res.json(todos);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

// Get a single To-Do item by ID
export const getTodoById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const todo = await getTodoByIdService(id);

    if (!todo) {
      res.status(404).json({ error: "To-Do not found" });
      return;
    }

    res.json(todo);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

// Update a To-Do item
export const updateTodo = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { title, description, completed } = req.body;

    await updateTodoService(id, { title, description, completed });

    res.json({ message: "To-Do updated successfully" });
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

// Delete a To-Do item
export const deleteTodo = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    await deleteTodoService(id);

    res.json({ message: "To-Do deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};
