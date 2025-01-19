import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";
import dotenv from "dotenv";

dotenv.config();

const isLocal = process.env.IS_OFFLINE === "true"; // Detect LocalStack mode

const client = new DynamoDBClient({
  region: process.env.AWS_REGION || "ap-southeast-1",
  endpoint: isLocal ? "http://localhost:4566" : undefined, // Use LocalStack in local mode
  credentials: isLocal
    ? { accessKeyId: "test", secretAccessKey: "test" } // Use default LocalStack credentials
    : undefined, // Use IAM roles in AWS environment
});

const dynamoDB = DynamoDBDocumentClient.from(client);

export { dynamoDB };
