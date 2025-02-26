# 新規リポジトリ作成とクローン設定

## 概要
DynamoDB版の機器管理システムの開発環境を構築するため、新規リポジトリの作成とブランチ戦略の設定を行いました。

## 実施内容

### 1. リポジトリ準備
- 新規リポジトリ作成: `device-management-dynamodb`
- 既存の`device-management`リポジトリからコードベースをクローン
  ```bash
  cd /mnt/c/Users/okita/projects/device-management-dynamodb
  git clone https://github.com/masashi-tamayama/device-management.git .
  ```

### 2. リモートリポジトリの設定変更
- 新規リポジトリへの向き先変更
  ```bash
  git remote set-url origin https://github.com/masashi-tamayama/device-management-dynamodb.git
  ```

### 3. ブランチ戦略の実装
1. developブランチの作成
   ```bash
   git checkout -b develop
   git push -u origin develop
   ```

2. feature/init-dynamodb-versionブランチの作成
   ```bash
   git checkout -b feature/init-dynamodb-version
   git push -u origin feature/init-dynamodb-version
   ```

## ブランチ構成
- `main`: プロダクション用（保護）
- `develop`: 開発用ブランチ
- `feature/init-dynamodb-version`: 現在の作業ブランチ

## 確認されたディレクトリ構造
```
device-management-dynamodb/
├── backend/
│   ├── lambda/
│   ├── package/
│   └── 設定ファイル群
├── frontend/
│   ├── src/
│   ├── public/
│   └── 設定ファイル群
└── docs/
```

## 今後の開発方針
1. feature/init-dynamodb-versionブランチで開発を進める
2. 開発完了後、developブランチにマージ
3. テスト完了後、mainブランチへマージ

## 技術スタック
- フロントエンド: React（CloudFront + S3）
- バックエンド: API Gateway + Lambda（Python）
- データベース: DynamoDB（JSON形式でデータ保存）