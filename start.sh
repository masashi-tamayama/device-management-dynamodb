#!/bin/sh

# バックエンドの起動
. backend/venv/bin/activate
cd backend
flask run --host=0.0.0.0 &

# フロントエンドの起動
cd ../frontend
npm run dev -- --host 0.0.0.0 