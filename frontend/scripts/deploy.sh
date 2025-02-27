#!/bin/bash

# 環境変数の設定
BUCKET_NAME="device-mgmt-frontend-dynamodb-bucket"
DISTRIBUTION_ID="E8UM6QL93YJ32"
REGION="ap-northeast-1"

# ビルド
echo "Building the application..."
npm run build

# S3へのデプロイ
echo "Deploying to S3..."
aws s3 sync dist s3://$BUCKET_NAME --delete --region $REGION

# CloudFrontのキャッシュ削除
echo "Invalidating CloudFront cache..."
aws cloudfront create-invalidation \
    --distribution-id $DISTRIBUTION_ID \
    --paths "/*"

echo "Deployment completed!" 