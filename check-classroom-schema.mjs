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

async function checkClassroomSchema() {
  console.log('🔍 教室テーブルのスキーマと現在のデータを詳細確認中...\n')

  try {
    // 1つの教室のすべてのフィールドを取得してスキーマを確認
    const { data: sampleClassroom, error } = await supabase
      .from('classrooms')
      .select('*')
      .limit(1)
      .single()

    if (error) {
      console.error('データ取得エラー:', error)
      return
    }

    console.log('📊 教室テーブルの利用可能フィールド:')
    console.log('=====================================')
    
    Object.keys(sampleClassroom).forEach((key, index) => {
      const value = sampleClassroom[key]
      const type = typeof value
      const isArray = Array.isArray(value)
      
      console.log(`${index + 1}. ${key}`)
      console.log(`   型: ${isArray ? 'array' : type}`)
      console.log(`   現在値: ${isArray ? JSON.stringify(value) : (value || 'null')}`)
      console.log('')
    })

    console.log('=====================================')
    console.log(`✅ 合計${Object.keys(sampleClassroom).length}個のフィールドが利用可能`)

    // すべての教室の現在の状態も確認
    const { data: allClassrooms } = await supabase
      .from('classrooms')
      .select('id, name, images, tuition_info, trial_lesson_info, features')
      .eq('status', 'published')

    console.log('\n📝 現在の教室データの充実度チェック:')
    console.log('=====================================')
    
    allClassrooms.forEach((classroom, index) => {
      console.log(`${index + 1}. ${classroom.name}`)
      console.log(`   画像: ${classroom.images ? `${classroom.images.length}枚` : '未設定'}`)
      console.log(`   料金情報: ${classroom.tuition_info ? '設定済み' : '未設定'}`)
      console.log(`   体験レッスン: ${classroom.trial_lesson_info ? '設定済み' : '未設定'}`)
      console.log(`   特徴: ${classroom.features ? `${classroom.features.length}個` : '未設定'}`)
      console.log('')
    })

  } catch (error) {
    console.error('エラーが発生しました:', error)
  }
}

checkClassroomSchema() 