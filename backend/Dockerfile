FROM python:3.9-slim

# アプリケーションディレクトリを作成
WORKDIR /app

# 必要なパッケージのインストール
COPY requirements.txt .
RUN pip install -r requirements.txt

# アプリケーションのコピー
COPY . .

# 環境変数の設定
ENV PYTHONPATH=/app
ENV FLASK_APP=lambda/devices/app.py
ENV FLASK_ENV=development
ENV FLASK_DEBUG=1

# ポート設定
EXPOSE 5000

# 起動コマンド
CMD ["flask", "run", "--host=0.0.0.0", "--port=5000"] 