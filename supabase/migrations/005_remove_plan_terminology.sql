-- 「プラン」という表現を「掲載サービス」に修正

-- payment_plansテーブルの既存データを更新
UPDATE payment_plans 
SET 
  name = '教室掲載サービス',
  description = '教室情報を検索結果に表示できるサービスです。'
WHERE name = '基本掲載プラン';

-- RLSポリシーのコメントを更新
DROP POLICY IF EXISTS "Anyone can view payment plans" ON payment_plans;
CREATE POLICY "Anyone can view listing services" ON payment_plans
  FOR SELECT USING (is_active = TRUE);

-- テーブルコメントを追加
COMMENT ON TABLE payment_plans IS '教室掲載サービスの料金情報';
COMMENT ON COLUMN payment_plans.name IS 'サービス名';
COMMENT ON COLUMN payment_plans.description IS 'サービス説明'; 