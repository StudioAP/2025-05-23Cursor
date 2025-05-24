import { createClient } from '@supabase/supabase-js'
import { config } from 'dotenv'

// 環境変数を読み込み
config({ path: '.env.local' })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('環境変数が設定されていません')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseServiceKey)

// ダミー教室データ
const dummyClassrooms = [
  {
    name: 'さくらピアノ教室',
    description: '初心者から上級者まで、一人一人のペースに合わせた指導を行います。アットホームな雰囲気の中で、楽しくピアノを学べる教室です。',
    pr_points: '・個人レッスン中心で丁寧な指導\n・発表会年2回開催\n・無料体験レッスンあり\n・駐車場完備',
    prefecture: '東京都',
    city: '渋谷区',
    address: '神宮前1-1-1',
    phone: '03-1234-5678',
    email: 'info@sakura-piano.com',
    website_url: 'https://sakura-piano.com',
    target_ages: ['幼児', '小学生', '中学生', '大人'],
    available_days: ['月曜日', '火曜日', '水曜日', '木曜日', '金曜日'],
    status: 'published'
  },
  {
    name: 'ひまわり音楽教室',
    description: 'クラシックからポップスまで幅広いジャンルに対応。リトミックコースも充実しており、小さなお子様から大人まで音楽の楽しさを体験できます。',
    pr_points: '・0歳からのリトミック\n・グループレッスンと個人レッスン選択可\n・楽器貸し出しサービス\n・月謝制で安心',
    prefecture: '大阪府',
    city: '大阪市中央区',
    address: '心斎橋1-2-3',
    phone: '06-9876-5432',
    email: 'contact@himawari-music.jp',
    website_url: 'https://himawari-music.jp',
    target_ages: ['0歳〜2歳', '幼児', '小学生', '大人'],
    available_days: ['火曜日', '水曜日', '木曜日', '土曜日', '日曜日'],
    status: 'published'
  },
  {
    name: 'コスモスピアノスクール',
    description: '音大卒の講師陣による本格的なピアノレッスン。コンクール対策から趣味まで、目標に応じたカリキュラムをご提案します。',
    pr_points: '・音大卒講師による指導\n・コンクール対策コース\n・大人の趣味コース\n・オンラインレッスン対応',
    prefecture: '神奈川県',
    city: '横浜市西区',
    address: 'みなとみらい2-1-1',
    phone: '045-123-4567',
    email: 'info@cosmos-piano.net',
    website_url: 'https://cosmos-piano.net',
    target_ages: ['幼児', '小学生', '中学生', '高校生', '大人'],
    available_days: ['月曜日', '水曜日', '金曜日', '土曜日'],
    status: 'published'
  }
]

async function seedClassrooms() {
  console.log('ダミー教室データの投入を開始...')

  try {
    // 各教室にテストユーザーIDを設定（実際のユーザーIDを使用する場合は適宜変更）
    const testOwnerId = '00000000-0000-0000-0000-000000000000' // ダミーのUUID

    for (const classroom of dummyClassrooms) {
      // 教室データを挿入
      const { data: classroomData, error: classroomError } = await supabase
        .from('classrooms')
        .insert([{
          ...classroom,
          owner_id: testOwnerId
        }])
        .select()

      if (classroomError) {
        console.error('教室データ挿入エラー:', classroomError)
        continue
      }

      const classroomId = classroomData[0].id
      console.log(`✅ ${classroom.name} を追加 (ID: ${classroomId})`)

      // アクティブな決済情報を追加（教室が検索結果に表示されるため）
      const subscriptionEndDate = new Date()
      subscriptionEndDate.setMonth(subscriptionEndDate.getMonth() + 1) // 1ヶ月後

      const { error: subscriptionError } = await supabase
        .from('subscriptions')
        .insert([{
          classroom_id: classroomId,
          status: 'active',
          current_period_end: subscriptionEndDate.toISOString()
        }])

      if (subscriptionError) {
        console.error('決済データ挿入エラー:', subscriptionError)
      } else {
        console.log(`  💳 決済情報追加済み`)
      }
    }

    console.log('\n🎉 ダミーデータの投入が完了しました！')
    console.log('検索ページで教室が表示されるか確認してください。')

  } catch (error) {
    console.error('エラーが発生しました:', error)
  }
}

// スクリプト実行
seedClassrooms() 