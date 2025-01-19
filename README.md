# 🚀 To-Do API  
A **serverless REST API** for managing To-Do items, built with **Express.js, TypeScript, DynamoDB, and AWS SAM**.  

## 📌 Features
- **CRUD operations** for To-Do items.
- Uses **DynamoDB** as the database.
- Supports **LocalStack** for local development.
- **Deployable to AWS Lambda** using AWS SAM.

---

## 📦 Installation
### 1️⃣ Clone the repository
```sh
git clone git@github.com:hoangngoclam/expressjs-typescript-serverless-sam-aws.git
cd expressjs-typescript-serverless-sam-aws
```
### 2️⃣ Install dependencies
```sh
npm install
```
### 3️⃣ Set up environment variables
Create a `.env` file:
```sh
AWS_REGION=ap-southeast-1
PORT=3000
```

## 🚀 Running the API Locally

### Start LocalStack
```sh
docker-compose up -d
```

### Run the server
```sh
npm run dev
```

The API will be available at:
🔗 http://localhost:3000

## 📡 API Endpoints

| Method  | Endpoint            | Description              |
|---------|---------------------|--------------------------|
| **POST**   | `/todos`            | Create a new To-Do item  |
| **GET**    | `/todos`            | Get all To-Do items      |
| **GET**    | `/todos/:id`        | Get a To-Do item by ID   |
| **PUT**    | `/todos/:id`        | Update a To-Do item     |
| **DELETE** | `/todos/:id`        | Delete a To-Do item     |

### Example Request: Create a To-Do
```sh
curl -X POST http://localhost:3000/todos -H "Content-Type: application/json" -d '{
  "uuid": "550e8400-e29b-41d4-a716-446655440000",
  "title": "Learn AWS SAM",
  "description": "Deploy a serverless app",
  "completed": false
}'
```

## 🚀 Deploying to AWS with AWS SAM

### Set up AWS credentials
Ensure your AWS credentials are correctly configured in `~/.aws/credentials`:
```
[default]
aws_access_key_id=YOUR_ACCESS_KEY
aws_secret_access_key=YOUR_SECRET_KEY
region=ap-southeast-1
```

### Deploy with AWS SAM
```sh
npm run deploy
```

### Verify Deployment
After deployment, AWS SAM will provide an API Gateway endpoint. Test it using:
```sh
curl -X GET https://your-api-gateway-url/todos
```