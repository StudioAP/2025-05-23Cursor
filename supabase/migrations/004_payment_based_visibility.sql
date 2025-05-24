-- 決済状況に基づく教室公開制御システム

-- classroomsテーブルのstatusを更新（payment_requiredを追加）
ALTER TABLE classrooms DROP CONSTRAINT IF EXISTS classrooms_status_check;
ALTER TABLE classrooms ADD CONSTRAINT classrooms_status_check 
  CHECK (status IN ('draft', 'payment_required', 'published', 'suspended'));

-- 教室の公開状況をチェックする関数
CREATE OR REPLACE FUNCTION check_classroom_publication_eligibility(classroom_uuid UUID)
RETURNS BOOLEAN AS $$
DECLARE
  subscription_active BOOLEAN := FALSE;
BEGIN
  -- アクティブなサブスクリプションがあるかチェック
  SELECT EXISTS(
    SELECT 1 FROM subscriptions 
    WHERE classroom_id = classroom_uuid 
    AND status = 'active'
    AND current_period_end > NOW()
  ) INTO subscription_active;
  
  RETURN subscription_active;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 教室の公開状態を自動更新するトリガー関数
CREATE OR REPLACE FUNCTION auto_update_classroom_visibility()
RETURNS TRIGGER AS $$
BEGIN
  -- サブスクリプションが非アクティブになった場合
  IF (TG_OP = 'UPDATE' AND OLD.status = 'active' AND NEW.status != 'active') OR
     (TG_OP = 'DELETE') THEN
    
    -- 対象の教室のstatusを自動でpayment_requiredに変更
    UPDATE classrooms 
    SET status = 'payment_required', updated_at = NOW()
    WHERE id = COALESCE(NEW.classroom_id, OLD.classroom_id)
    AND status = 'published';
    
  -- サブスクリプションがアクティブになった場合
  ELSIF TG_OP = 'UPDATE' AND OLD.status != 'active' AND NEW.status = 'active' THEN
    
    -- payment_requiredの教室をdraftに戻す（手動公開を促すため）
    UPDATE classrooms 
    SET status = 'draft', updated_at = NOW()
    WHERE id = NEW.classroom_id
    AND status = 'payment_required';
    
  END IF;
  
  RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- サブスクリプション変更時のトリガー
DROP TRIGGER IF EXISTS subscription_status_change ON subscriptions;
CREATE TRIGGER subscription_status_change
  AFTER UPDATE OR DELETE ON subscriptions
  FOR EACH ROW EXECUTE FUNCTION auto_update_classroom_visibility();

-- 既存の未決済教室のステータスを更新
UPDATE classrooms 
SET status = 'payment_required'
WHERE status = 'published' 
AND NOT EXISTS (
  SELECT 1 FROM subscriptions 
  WHERE subscriptions.classroom_id = classrooms.id 
  AND subscriptions.status = 'active'
  AND subscriptions.current_period_end > NOW()
);

-- classroomsテーブルのRLSポリシーを更新（payment_requiredは所有者のみ閲覧可能）
DROP POLICY IF EXISTS "Anyone can view published classrooms" ON classrooms;
CREATE POLICY "Anyone can view published classrooms" ON classrooms
  FOR SELECT USING (status = 'published');

-- 月額料金の定数を保存するテーブル
CREATE TABLE IF NOT EXISTS payment_plans (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name VARCHAR(50) NOT NULL,
  price_monthly INTEGER NOT NULL, -- 円単位
  description TEXT,
  features TEXT[],
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 基本プランを挿入
INSERT INTO payment_plans (name, price_monthly, description, features)
VALUES (
  '基本掲載プラン',
  500,
  '教室情報を検索結果に表示できる基本プランです。',
  ARRAY['検索結果に表示', 'お問い合わせ受付', '基本的な教室情報掲載']
) ON CONFLICT DO NOTHING;

-- RLS有効化
ALTER TABLE payment_plans ENABLE ROW LEVEL SECURITY;

-- 誰でも閲覧可能（料金プラン情報）
CREATE POLICY "Anyone can view payment plans" ON payment_plans
  FOR SELECT USING (is_active = TRUE); 