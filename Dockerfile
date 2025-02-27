FROM node:20-alpine as frontend

WORKDIR /app
COPY frontend/package*.json ./frontend/
RUN cd frontend && npm install

FROM python:3.11-slim

# Node.jsのインストール
RUN apt-get update && apt-get install -y \
    curl \
    && curl -fsSL https://deb.nodesource.com/setup_20.x | bash - \
    && apt-get install -y nodejs \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app
COPY backend/requirements.txt ./backend/
RUN python -m venv backend/venv && \
    . backend/venv/bin/activate && \
    pip install -r backend/requirements.txt

COPY . .
COPY --from=frontend /app/frontend/node_modules ./frontend/node_modules

# スタートアップスクリプト
COPY start.sh /start.sh
RUN chmod +x /start.sh

CMD ["/start.sh"] 