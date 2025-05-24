import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('環境変数が設定されていません')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseServiceKey)

async function checkCurrentState() {
  console.log('🔍 現在のデータベース状況を確認中...\n')

  try {
    // 1. 全教室の状況を確認
    const { data: classrooms, error: classroomError } = await supabase
      .from('classrooms')
      .select(`
        id,
        name,
        owner_id,
        status,
        profiles (
          email,
          full_name
        )
      `)
      .order('name')

    if (classroomError) {
      console.error('教室取得エラー:', classroomError)
      return
    }

    console.log('📋 教室一覧:')
    console.log('=====================================')
    
    classrooms.forEach(classroom => {
      console.log(`🏫 ${classroom.name}`)
      console.log(`   owner_id: ${classroom.owner_id || 'null'}`)
      console.log(`   オーナー: ${classroom.profiles?.full_name || 'なし'} (${classroom.profiles?.email || 'メール不明'})`)
      console.log(`   ステータス: ${classroom.status}`)
      console.log('')
    })

    // 2. 全プロファイルの状況を確認
    const { data: profiles, error: profileError } = await supabase
      .from('profiles')
      .select('id, full_name, email, user_type')
      .order('email')

    if (profileError) {
      console.error('プロファイル取得エラー:', profileError)
      return
    }

    console.log('👤 ユーザープロファイル一覧:')
    console.log('=====================================')
    
    profiles.forEach(profile => {
      console.log(`👤 ${profile.full_name} (${profile.email})`)
      console.log(`   ID: ${profile.id}`)
      console.log(`   種別: ${profile.user_type}`)
      console.log('')
    })

    // 3. 検索対象となる教室の統計
    const publishedCount = classrooms.filter(c => c.status === 'published').length
    const testClassrooms = classrooms.filter(c => c.profiles?.email === 'test@piano-navi.com')
    const orphanedClassrooms = classrooms.filter(c => !c.profiles)

    console.log('📊 統計情報:')
    console.log('=====================================')
    console.log(`🏫 総教室数: ${classrooms.length}件`)
    console.log(`🔍 検索結果表示数 (published): ${publishedCount}件`)
    console.log(`📝 テストアカウント教室: ${testClassrooms.length}件`)
    console.log(`👻 孤立した教室 (owner_id不整合): ${orphanedClassrooms.length}件`)
    console.log('')

    if (orphanedClassrooms.length > 0) {
      console.log('👻 孤立した教室:')
      orphanedClassrooms.forEach(classroom => {
        console.log(`   - ${classroom.name} (owner_id: ${classroom.owner_id})`)
      })
    }

  } catch (error) {
    console.error('エラーが発生しました:', error)
  }
}

// スクリプト実行
checkCurrentState()
  .then(() => {
    console.log('\n🏁 確認処理が完了しました')
    process.exit(0)
  })
  .catch((error) => {
    console.error('確認処理でエラーが発生しました:', error)
    process.exit(1)
  }) 