#!/bin/bash

# DynamoDBローカルのエンドポイントを設定
ENDPOINT_URL="http://localhost:8000"

# テストデータ1を追加
aws dynamodb put-item \
    --table-name devices \
    --item '{
        "id": {"S": "1"},
        "name": {"S": "温度センサー1"},
        "type": {"S": "センサー"},
        "location": {"S": "1階 サーバールーム"},
        "status": {"S": "稼働中"}
    }' \
    --endpoint-url $ENDPOINT_URL

# テストデータ2を追加
aws dynamodb put-item \
    --table-name devices \
    --item '{
        "id": {"S": "2"},
        "name": {"S": "監視カメラA"},
        "type": {"S": "カメラ"},
        "location": {"S": "2階 エントランス"},
        "status": {"S": "点検中"}
    }' \
    --endpoint-url $ENDPOINT_URL

# データが正しく追加されたか確認
aws dynamodb scan \
    --table-name devices \
    --endpoint-url $ENDPOINT_URL 