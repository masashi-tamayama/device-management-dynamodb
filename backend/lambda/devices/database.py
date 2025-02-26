import os
from typing import Optional

# DynamoDB設定
DYNAMODB_TABLE_NAME = os.getenv("DYNAMODB_TABLE_NAME", "devices")
DYNAMODB_ENDPOINT_URL = os.getenv("DYNAMODB_ENDPOINT_URL", None)  # ローカル開発用
AWS_REGION = os.getenv("AWS_REGION", "ap-northeast-1")