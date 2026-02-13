# デプロイ情報

## 本番環境

- **ホスティング**: Cloudflare Pages
- **本番URL**: https://tools.realize-inc.co.jp
- **フレームワーク**: Next.js 16.1.6

## ビルド設定

### Cloudflare Pages設定
- **ビルドコマンド**: `npm run build`
- **出力ディレクトリ**: `.next`
- **Node.jsバージョン**: 20以上推奨

## デプロイ手順

1. 変更をGitリポジトリにプッシュ
2. Cloudflare Pagesが自動的にビルド・デプロイを実行

## ローカル開発

```bash
# 開発サーバー起動
npm run dev

# ポート: 3004
# URL: http://localhost:3004
```

## トラブルシューティング

### 404エラーが出る場合
- Cloudflare Pagesで再デプロイを実行
- キャッシュをクリア

### ローカルで404エラーが出る場合
```bash
# .nextディレクトリを削除して再起動
rm -rf .next
npm run dev
```
