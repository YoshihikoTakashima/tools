# ツール集アプリ

Next.jsで作成したシンプルなWebツール集です。現在は電卓機能を実装しています。

## 機能

- ✅ 電卓（四則演算）
- 📱 レスポンシブデザイン
- 🎯 AdSenseスペース確保済み

## 開発環境

```bash
# 依存関係のインストール
npm install

# 開発サーバーの起動
npm run dev
```

開発サーバーは http://localhost:3000 で起動します。

## ビルド

```bash
# 静的サイトとしてビルド
npm run build
```

ビルド結果は `out` ディレクトリに出力されます。

## Cloudflare Pagesへのデプロイ

### 1. Cloudflare Pagesの設定

1. [Cloudflare Dashboard](https://dash.cloudflare.com/)にログイン
2. "Workers & Pages" > "Create application" > "Pages" > "Connect to Git"を選択
3. GitHubリポジトリを接続

### 2. ビルド設定

- **ビルドコマンド**: `npm run build`
- **ビルド出力ディレクトリ**: `out`
- **Node.jsバージョン**: 20以上

### 3. デプロイ

設定完了後、gitにプッシュすると自動的にデプロイされます。

## 技術スタック

- **フレームワーク**: Next.js 16 (App Router)
- **言語**: TypeScript
- **スタイリング**: Tailwind CSS
- **ホスティング**: Cloudflare Pages (静的エクスポート)

## ディレクトリ構成

```
.
├── app/
│   ├── layout.tsx    # ルートレイアウト
│   ├── page.tsx      # 電卓ページ
│   └── globals.css   # グローバルスタイル
├── public/           # 静的ファイル
├── next.config.ts    # Next.js設定
└── package.json
```

## AdSenseの設定

`app/page.tsx` の以下の部分に、AdSenseのコードを挿入してください。

```tsx
{/* AdSense スペース（上部） */}
<div className="w-full bg-white border-b border-slate-300 p-4">
  <div className="max-w-3xl mx-auto h-20 bg-slate-100 flex items-center justify-center text-slate-400 text-sm">
    AdSense 広告スペース (728x90)
  </div>
</div>
```

## ライセンス

MIT
