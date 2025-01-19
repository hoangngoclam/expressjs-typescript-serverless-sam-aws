#!/bin/bash

echo "Initializing DynamoDB tables..."

# Create the 'todos' table with uuid as a string (S)
awslocal dynamodb create-table \
    --table-name todos \
    --attribute-definitions \
        AttributeName=uuid,AttributeType=S \
    --key-schema \
        AttributeName=uuid,KeyType=HASH \
    --provisioned-throughput \
        ReadCapacityUnits=1,WriteCapacityUnits=1 \
    --region ap-southeast-1

echo "Waiting for table creation..."
sleep 5  # Give time for DynamoDB table to initialize

echo "Seeding example To-Do items..."

# Insert example To-Do items with real UUIDs
awslocal dynamodb put-item --table-name todos --item '{
    "uuid": {"S": "550e8400-e29b-41d4-a716-446655440000"},
    "title": {"S": "Learn AWS SAM"},
    "description": {"S": "Deploy a serverless app using AWS SAM"},
    "completed": {"BOOL": false}
}' --region ap-southeast-1

awslocal dynamodb put-item --table-name todos --item '{
    "uuid": {"S": "123e4567-e89b-12d3-a456-426614174001"},
    "title": {"S": "Build a CRUD API"},
    "description": {"S": "Develop a RESTful API with Express.js and DynamoDB"},
    "completed": {"BOOL": false}
}' --region ap-southeast-1

awslocal dynamodb put-item --table-name todos --item '{
    "uuid": {"S": "f47ac10b-58cc-4372-a567-0e02b2c3d479"},
    "title": {"S": "Test API with Jest"},
    "description": {"S": "Write unit tests for the API"},
    "completed": {"BOOL": false}
}' --region ap-southeast-1

echo "Example To-Dos inserted!"
