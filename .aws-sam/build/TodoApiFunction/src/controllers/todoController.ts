import { Request, Response } from "express";
import { dynamoDB } from "../config/dynamo";
import {
  GetCommand,
  PutCommand,
  ScanCommand,
  DeleteCommand,
  UpdateCommand,
} from "@aws-sdk/lib-dynamodb";
import { Todo } from "../models/todo";

const TABLE_NAME = "todos";

// Create a new To-Do item
export const createTodo = async (req: Request, res: Response): Promise<void> => {
  try {
    const { uuid, title, description, completed } = req.body;

    if (!uuid || !title) {
      res.status(400).json({ error: "UUID and Title are required" });
      return;
    }

    const todo: Todo = { uuid, title, description, completed: false };

    await dynamoDB.send(new PutCommand({ TableName: TABLE_NAME, Item: todo }));

    res.status(201).json({ message: "To-Do created successfully", todo });
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

// Get all To-Do items
export const getTodos = async (_req: Request, res: Response): Promise<void> => {
  try {
    const result = await dynamoDB.send(new ScanCommand({ TableName: TABLE_NAME }));
    res.json(result.Items);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

// Get a single To-Do item by ID
export const getTodoById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    const result = await dynamoDB.send(
      new GetCommand({ TableName: TABLE_NAME, Key: { uuid: Number(id) } })
    );

    if (!result.Item) {
      res.status(404).json({ error: "To-Do not found" });
      return;
    }

    res.json(result.Item);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

// Update a To-Do item
export const updateTodo = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { title, description, completed } = req.body;

    await dynamoDB.send(
      new UpdateCommand({
        TableName: TABLE_NAME,
        Key: { uuid: Number(id) },
        UpdateExpression: "set title = :title, description = :desc, completed = :completed",
        ExpressionAttributeValues: {
          ":title": title,
          ":desc": description,
          ":completed": completed,
        },
      })
    );

    res.json({ message: "To-Do updated successfully" });
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

// Delete a To-Do item
export const deleteTodo = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    await dynamoDB.send(new DeleteCommand({ TableName: TABLE_NAME, Key: { uuid: Number(id) } }));

    res.json({ message: "To-Do deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};
