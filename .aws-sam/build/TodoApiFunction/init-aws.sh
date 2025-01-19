#!/bin/bash

echo "Initializing DynamoDB tables..."

# Create the 'requests' table
awslocal dynamodb create-table \
    --table-name todos \
    --attribute-definitions \
        AttributeName=uuid,AttributeType=S \
    --key-schema \
        AttributeName=uuid,KeyType=HASH \
    --provisioned-throughput \
        ReadCapacityUnits=1,WriteCapacityUnits=1 \
    --region ap-southeast-1