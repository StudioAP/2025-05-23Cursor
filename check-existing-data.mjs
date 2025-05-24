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

async function checkExistingData() {
  console.log('🔍 既存データを確認中...\n')

  // プロファイル確認
  console.log('=== プロファイル ===')
  const { data: profiles, error: profileError } = await supabase
    .from('profiles')
    .select('id, full_name, email, user_type')
    .limit(10)

  if (profileError) {
    console.error('プロファイル取得エラー:', profileError)
  } else {
    console.log(`プロファイル数: ${profiles.length}`)
    profiles.forEach(p => {
      console.log(`- ${p.id} | ${p.full_name} | ${p.email} | ${p.user_type}`)
    })
  }

  // 教室確認
  console.log('\n=== 教室 ===')
  const { data: classrooms, error: classroomError } = await supabase
    .from('classrooms')
    .select('id, name, owner_id, status, created_at')
    .limit(10)

  if (classroomError) {
    console.error('教室取得エラー:', classroomError)
  } else {
    console.log(`教室数: ${classrooms.length}`)
    classrooms.forEach(c => {
      console.log(`- ${c.id} | ${c.name} | ${c.status} | ${c.owner_id} | ${c.created_at}`)
    })
  }

  // 決済情報確認
  console.log('\n=== アクティブ決済 ===')
  const { data: subscriptions, error: subscriptionError } = await supabase
    .from('subscriptions')
    .select('id, classroom_id, status, current_period_end')
    .eq('status', 'active')
    .gte('current_period_end', new Date().toISOString())
    .limit(10)

  if (subscriptionError) {
    console.error('決済取得エラー:', subscriptionError)
  } else {
    console.log(`アクティブ決済数: ${subscriptions.length}`)
    subscriptions.forEach(s => {
      console.log(`- ${s.id} | 教室ID: ${s.classroom_id} | ${s.status} | 期限: ${s.current_period_end}`)
    })
  }

  // 検索結果シミュレーション
  console.log('\n=== 検索結果シミュレーション ===')
  const { data: searchResults, error: searchError } = await supabase
    .from('classrooms')
    .select(`
      id,
      name,
      prefecture,
      city,
      status,
      subscriptions!inner (
        id,
        status,
        current_period_end
      )
    `)
    .eq('status', 'published')
    .eq('subscriptions.status', 'active')
    .gte('subscriptions.current_period_end', new Date().toISOString())

  if (searchError) {
    console.error('検索エラー:', searchError)
  } else {
    console.log(`検索結果数: ${searchResults.length}`)
    searchResults.forEach(r => {
      console.log(`- ${r.name} (${r.prefecture} ${r.city}) | 決済有効`)
    })
  }
}

checkExistingData() 