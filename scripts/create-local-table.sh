#!/bin/bash

# DynamoDBローカルのエンドポイントを設定
ENDPOINT_URL="http://localhost:8000"

# devicesテーブルを作成
aws dynamodb create-table \
    --table-name devices \
    --attribute-definitions \
        AttributeName=id,AttributeType=S \
    --key-schema \
        AttributeName=id,KeyType=HASH \
    --provisioned-throughput \
        ReadCapacityUnits=5,WriteCapacityUnits=5 \
    --endpoint-url $ENDPOINT_URL

# テーブル作成の確認
aws dynamodb list-tables --endpoint-url $ENDPOINT_URL 