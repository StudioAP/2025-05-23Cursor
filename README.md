# ピアノ教室ナビ

ピアノ教室・リトミック教室の検索・掲載プラットフォーム

## 🎯 プロジェクト概要

ユーザーが自分好みのピアノ教室・リトミック教室を検索し、見つけ、問い合わせまでできるウェブサイトです。教室運営者は教室情報（写真含む）を登録し、月額500円の掲載費をStripeで支払うことで、教室情報を公開・検索対象とすることができます。

## 🚀 技術スタック

- **フロントエンド**: Next.js 14 (App Router), TypeScript, Tailwind CSS
- **バックエンド**: Next.js API Routes, Supabase
- **データベース**: Supabase (PostgreSQL)
- **認証**: Supabase Auth
- **決済**: Stripe
- **ホスティング**: Vercel
- **アイコン**: Lucide React

## 📋 主要機能

### 一般ユーザー向け機能
- [x] 教室検索機能（エリア、キーワード、対象年齢、曜日での絞り込み）
- [x] 検索結果一覧表示
- [ ] 教室詳細表示
- [ ] 問い合わせ機能

### 教室運営者向け機能
- [x] アカウント登録・ログイン
- [ ] 教室情報登録・編集
- [ ] 写真アップロード
- [ ] 掲載プラン管理・決済（Stripe連携）
- [ ] 問い合わせ管理

### 管理者向け機能
- [ ] ユーザーアカウント管理
- [ ] 教室情報管理
- [ ] 決済状況確認

## 🗄️ データベース設計

### 主要テーブル
- `profiles` - ユーザープロファイル
- `classrooms` - 教室情報
- `classroom_photos` - 教室写真
- `courses` - レッスンコース
- `subscriptions` - Stripe サブスクリプション管理
- `inquiries` - 問い合わせ

## 🛠️ セットアップ

### 前提条件
- Node.js 18以上
- npm または yarn
- Supabase アカウント
- Stripe アカウント

### 環境変数設定

`.env.local` ファイルを作成し、以下の環境変数を設定してください：

```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# Stripe
STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret

# App URL
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Monthly subscription price (500 yen in cents)
STRIPE_MONTHLY_PRICE_ID=price_monthly_500_yen
```

### インストールと起動

```bash
# 依存関係のインストール
npm install

# 開発サーバーの起動
npm run dev
```

### データベースセットアップ

1. Supabaseプロジェクトを作成
2. `supabase/migrations/001_initial_schema.sql` を実行してテーブルを作成
3. Row Level Security (RLS) ポリシーが適用されていることを確認

## 📁 プロジェクト構造

```
src/
├── app/                    # Next.js App Router
│   ├── auth/              # 認証関連ページ
│   │   ├── login/         # ログインページ
│   │   └── register/      # 新規登録ページ
│   ├── search/            # 検索ページ
│   ├── classrooms/        # 教室詳細ページ
│   ├── dashboard/         # 運営者ダッシュボード
│   └── api/               # API Routes
├── components/            # Reactコンポーネント
│   └── layout/           # レイアウトコンポーネント
├── lib/                  # ユーティリティ関数
├── types/                # TypeScript型定義
└── styles/               # スタイルファイル
```

## 🎨 デザインシステム

### カラーパレット
- **プライマリ**: オレンジ系 (#FF8A50)
- **セカンダリ**: 青系 (#4A90E2)
- **アクセント**: イエロー系 (#FFD93D)

### コンポーネント
- Tailwind CSS を使用したユーティリティファーストアプローチ
- レスポンシブデザイン対応
- アクセシビリティ考慮

## 🚧 開発状況

### 完了済み
- [x] プロジェクト基盤構築
- [x] データベース設計・マイグレーション
- [x] 認証システム（ログイン・新規登録）
- [x] 基本レイアウト（ヘッダー・フッター）
- [x] トップページ
- [x] 教室検索ページ

### 開発中
- [ ] 教室詳細ページ
- [ ] 運営者ダッシュボード
- [ ] 教室情報登録・編集機能
- [ ] Stripe決済連携
- [ ] 問い合わせ機能

### 今後の予定
- [ ] 管理者機能
- [ ] メール通知機能
- [ ] 画像最適化
- [ ] SEO対策
- [ ] パフォーマンス最適化

## 📝 開発ガイドライン

### コーディング規約
- TypeScript を使用し、型安全性を確保
- ESLint + Prettier でコード品質を維持
- コンポーネントは機能別に分割
- カスタムフックで状態管理ロジックを分離

### Git フロー
- `main` ブランチは本番環境
- `develop` ブランチで開発
- 機能ごとに `feature/` ブランチを作成

## 🔒 セキュリティ

- Supabase Row Level Security (RLS) でデータアクセス制御
- CSRF対策実装
- XSS対策（DOMPurify使用予定）
- 環境変数での機密情報管理

## 📊 監視・分析

- Vercel Analytics でパフォーマンス監視
- Stripe Dashboard で決済状況監視
- エラーログ収集（Sentry導入予定）

## 🤝 コントリビューション

1. このリポジトリをフォーク
2. 機能ブランチを作成 (`git checkout -b feature/amazing-feature`)
3. 変更をコミット (`git commit -m 'Add some amazing feature'`)
4. ブランチにプッシュ (`git push origin feature/amazing-feature`)
5. プルリクエストを作成

## 📄 ライセンス

このプロジェクトは MIT ライセンスの下で公開されています。

## 📞 サポート

質問や問題がある場合は、GitHub Issues でお知らせください。

---

© 2024 ピアノ教室ナビ. All rights reserved.
