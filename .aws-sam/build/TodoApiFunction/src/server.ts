import dotenv from "dotenv";
import express from "express";
import serverless from "serverless-http";
import todoRoutes from "./routes/todoRoutes";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use("/todos", todoRoutes);

// ✅ Start Express server only in local mode
if (process.env.IS_OFFLINE === "true") {
  app.listen(PORT, () => {
    console.log(`🚀 Server running locally at http://localhost:${PORT}`);
  });
}

// ✅ Export handler for AWS Lambda
export const handler = serverless(app);
