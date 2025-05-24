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

async function fixData() {
  console.log('🔧 データ修正を開始...\n')

  // 1. 既存の教室をpublishedに変更
  console.log('=== 既存教室の公開設定 ===')
  const { data: updatedClassrooms, error: updateError } = await supabase
    .from('classrooms')
    .update({ status: 'published' })
    .eq('status', 'draft')
    .select('id, name, status')

  if (updateError) {
    console.error('更新エラー:', updateError)
  } else {
    console.log(`${updatedClassrooms.length}件の教室を公開状態に変更しました`)
    updatedClassrooms.forEach(c => {
      console.log(`✅ ${c.name} → ${c.status}`)
    })
  }

  // 2. ダミーデータ追加（実在のowner_idを使用）
  console.log('\n=== ダミー教室データ追加 ===')
  
  // 既存のprofile IDを取得
  const { data: existingProfiles } = await supabase
    .from('profiles')
    .select('id')
    .eq('user_type', 'classroom_owner')
    .limit(1)

  if (!existingProfiles || existingProfiles.length === 0) {
    console.log('❌ 教室運営者プロファイルが見つかりません')
    return
  }

  const ownerId = existingProfiles[0].id

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
      status: 'published',
      owner_id: ownerId
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
      status: 'published',
      owner_id: ownerId
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
      status: 'published',
      owner_id: ownerId
    }
  ]

  for (const classroom of dummyClassrooms) {
    // 教室データを挿入
    const { data: classroomData, error: classroomError } = await supabase
      .from('classrooms')
      .insert([classroom])
      .select()

    if (classroomError) {
      console.error(`${classroom.name} 挿入エラー:`, classroomError)
      continue
    }

    const classroomId = classroomData[0].id
    console.log(`✅ ${classroom.name} を追加 (ID: ${classroomId})`)

    // アクティブな決済情報を追加
    const subscriptionEndDate = new Date()
    subscriptionEndDate.setMonth(subscriptionEndDate.getMonth() + 1)

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

  // 3. 最終確認
  console.log('\n=== 最終確認 ===')
  const { data: finalCheck, error: finalError } = await supabase
    .from('classrooms')
    .select(`
      id,
      name,
      prefecture,
      city,
      status,
      subscriptions!inner (
        status,
        current_period_end
      )
    `)
    .eq('status', 'published')
    .eq('subscriptions.status', 'active')
    .gte('subscriptions.current_period_end', new Date().toISOString())

  if (finalError) {
    console.error('最終確認エラー:', finalError)
  } else {
    console.log(`🎉 検索可能な教室数: ${finalCheck.length}`)
    finalCheck.forEach(r => {
      console.log(`- ${r.name} (${r.prefecture} ${r.city})`)
    })
  }

  console.log('\n✨ データ修正が完了しました！検索ページで確認してください。')
}

fixData() 