import { dynamoDB } from "../config/dynamo";
import {
  GetCommand,
  PutCommand,
  ScanCommand,
  DeleteCommand,
  UpdateCommand,
} from "@aws-sdk/lib-dynamodb";
import { Todo } from "../models/todo.models";

const TABLE_NAME = "todos";

// Create a new To-Do item
export const createTodoService = async (todo: Todo) => {
  await dynamoDB.send(new PutCommand({ TableName: TABLE_NAME, Item: todo }));
  return todo;
};

// Get all To-Do items
export const getTodosService = async () => {
  const result = await dynamoDB.send(new ScanCommand({ TableName: TABLE_NAME }));
  return result.Items || [];
};

// Get a single To-Do item by ID
export const getTodoByIdService = async (uuid: string) => {
  const result = await dynamoDB.send(new GetCommand({ TableName: TABLE_NAME, Key: { uuid } }));
  return result.Item;
};

// Update a To-Do item
export const updateTodoService = async (uuid: string, updateData: Partial<Todo>) => {
  await dynamoDB.send(
    new UpdateCommand({
      TableName: TABLE_NAME,
      Key: { uuid },
      UpdateExpression: "set title = :title, description = :desc, completed = :completed",
      ExpressionAttributeValues: {
        ":title": updateData.title,
        ":desc": updateData.description,
        ":completed": updateData.completed,
      },
    })
  );
};

// Delete a To-Do item
export const deleteTodoService = async (uuid: string) => {
  await dynamoDB.send(new DeleteCommand({ TableName: TABLE_NAME, Key: { uuid } }));
};
