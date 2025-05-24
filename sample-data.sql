-- サンプルデータ挿入
-- まず profiles テーブルに所有者を追加
INSERT INTO profiles (id, full_name, email, user_type) VALUES
  ('550e8400-e29b-41d4-a716-446655440000', '田中太郎', 'tanaka@example.com', 'classroom_owner'),
  ('550e8400-e29b-41d4-a716-446655440001', '佐藤花子', 'sato@example.com', 'classroom_owner'),
  ('550e8400-e29b-41d4-a716-446655440002', '鈴木一郎', 'suzuki@example.com', 'classroom_owner');

-- 教室データを追加
INSERT INTO classrooms (
  id, name, description, prefecture, city, address, phone, email, website_url,
  owner_id, status, is_paid, target_ages, available_days, pr_points
) VALUES
  (
    '550e8400-e29b-41d4-a716-446655440100',
    '田中ピアノ教室',
    '初心者から上級者まで、一人ひとりに合わせた丁寧な指導を行います。楽しくピアノを学べる環境を提供しています。発表会も年2回開催しており、生徒の成長を実感できます。',
    '東京都',
    '渋谷区',
    '渋谷区恵比寿1-1-1',
    '03-1234-5678',
    'info@tanaka-piano.com',
    'https://tanaka-piano.com',
    '550e8400-e29b-41d4-a716-446655440000',
    'published',
    true,
    ARRAY['小学生', '中学生', '高校生', '大人'],
    ARRAY['月曜日', '火曜日', '水曜日', '木曜日', '金曜日'],
    '初心者歓迎・駅近・発表会あり'
  ),
  (
    '550e8400-e29b-41d4-a716-446655440101',
    'さくらピアノスクール',
    '3歳から始められるピアノ教室です。音楽の楽しさを第一に、基礎からしっかりと指導いたします。保護者の方もレッスンを見学していただけます。',
    '東京都',
    '新宿区',
    '新宿区新宿3-1-1',
    '03-2345-6789',
    'contact@sakura-piano.jp',
    'https://sakura-piano.jp',
    '550e8400-e29b-41d4-a716-446655440001',
    'published',
    true,
    ARRAY['0-3歳', '3-6歳', '小学生'],
    ARRAY['火曜日', '水曜日', '木曜日', '土曜日', '日曜日'],
    '3歳から・見学可能・優しい先生'
  ),
  (
    '550e8400-e29b-41d4-a716-446655440102',
    'クラシック音楽院',
    'クラシック音楽の本格的な指導を行う音楽院です。音大受験対策から趣味まで幅広く対応。経験豊富な講師陣がお待ちしています。',
    '東京都',
    '品川区',
    '品川区五反田2-2-2',
    '03-3456-7890',
    'info@classic-academy.com',
    'https://classic-academy.com',
    '550e8400-e29b-41d4-a716-446655440002',
    'published',
    true,
    ARRAY['高校生', '大人'],
    ARRAY['月曜日', '水曜日', '金曜日', '土曜日'],
    '音大受験対応・本格指導・経験豊富'
  );

-- 教室の写真を追加
INSERT INTO classroom_photos (id, classroom_id, photo_url, caption, display_order) VALUES
  (
    '550e8400-e29b-41d4-a716-446655440200',
    '550e8400-e29b-41d4-a716-446655440100',
    'https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?w=800&h=600&fit=crop',
    'メインレッスン室',
    1
  ),
  (
    '550e8400-e29b-41d4-a716-446655440201',
    '550e8400-e29b-41d4-a716-446655440101',
    'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&h=600&fit=crop',
    '明るいレッスン室',
    1
  ),
  (
    '550e8400-e29b-41d4-a716-446655440202',
    '550e8400-e29b-41d4-a716-446655440102',
    'https://images.unsplash.com/photo-1507838153414-b4b713384a76?w=800&h=600&fit=crop',
    'グランドピアノ完備',
    1
  );

-- コースデータを追加
INSERT INTO courses (id, classroom_id, name, description, price, duration_minutes) VALUES
  (
    '550e8400-e29b-41d4-a716-446655440300',
    '550e8400-e29b-41d4-a716-446655440100',
    '初級コース',
    'ピアノ初心者向けのコースです',
    8000,
    45
  ),
  (
    '550e8400-e29b-41d4-a716-446655440301',
    '550e8400-e29b-41d4-a716-446655440100',
    '中級コース',
    'ある程度経験のある方向けのコースです',
    10000,
    60
  ),
  (
    '550e8400-e29b-41d4-a716-446655440302',
    '550e8400-e29b-41d4-a716-446655440101',
    'キッズコース',
    '3歳から小学生向けのコースです',
    6000,
    30
  ),
  (
    '550e8400-e29b-41d4-a716-446655440303',
    '550e8400-e29b-41d4-a716-446655440102',
    '音大受験コース',
    '音楽大学受験を目指す方向けのコースです',
    15000,
    90
  ); 