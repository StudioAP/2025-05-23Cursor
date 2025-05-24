import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'
import { randomUUID } from 'crypto'

dotenv.config({ path: '.env.local' })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('環境変数が設定されていません')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseServiceKey)

async function convertDummyClassrooms() {
  console.log('🔄 ダミー教室を架空のowner_idに変更中...\n')

  try {
    // 1. 現在のダミー教室を取得（テストアカウント以外の全教室）
    const { data: classrooms, error: fetchError } = await supabase
      .from('classrooms')
      .select(`
        id,
        name,
        owner_id,
        profiles (
          email
        )
      `)

    if (fetchError) {
      console.error('教室取得エラー:', fetchError)
      return
    }

    // テストアカウント以外の教室を特定
    const dummyClassrooms = classrooms.filter(classroom => 
      classroom.profiles?.email !== 'test@piano-navi.com'
    )

    console.log(`📊 ダミー教室数: ${dummyClassrooms.length}件`)
    
    if (dummyClassrooms.length === 0) {
      console.log('ℹ️  変更対象のダミー教室がありません')
      return
    }

    // 2. 各ダミー教室のowner_idを架空のUUIDに変更
    for (const classroom of dummyClassrooms) {
      const fakeOwnerID = randomUUID()
      
      console.log(`🏫 教室: ${classroom.name}`)
      console.log(`   現在のowner_id: ${classroom.owner_id}`)
      console.log(`   新しいowner_id: ${fakeOwnerID}`)

      // 教室のowner_idを更新
      const { error: updateError } = await supabase
        .from('classrooms')
        .update({ owner_id: fakeOwnerID })
        .eq('id', classroom.id)

      if (updateError) {
        console.error(`   ❌ 更新エラー: ${updateError.message}`)
      } else {
        console.log(`   ✅ 更新完了`)
      }
    }

    // 3. 最終確認
    const { data: finalClassrooms } = await supabase
      .from('classrooms')
      .select(`
        id,
        name,
        owner_id,
        status,
        published,
        profiles (
          email
        )
      `)
      .order('name')

    console.log('\n🎉 ダミー教室変換完了！')
    console.log('=====================================')
    
    finalClassrooms.forEach(classroom => {
      const isTestClassroom = classroom.profiles?.email === 'test@piano-navi.com'
      const status = isTestClassroom ? '📝 テストアカウント用' : '🎭 ダミー教室（架空のowner_id）'
      
      console.log(`🏫 ${classroom.name}`)
      console.log(`   ${status}`)
      console.log(`   ステータス: ${classroom.status}`)
      console.log(`   公開状態: ${classroom.published ? '公開中' : '非公開'}`)
      console.log(`   owner_id: ${classroom.owner_id}`)
      console.log('')
    })

    console.log('📋 検索機能での表示状況:')
    const publishedCount = finalClassrooms.filter(c => c.published).length
    console.log(`   検索結果に表示される教室数: ${publishedCount}件`)
    
    console.log('\n✨ 設定完了')
    console.log('==========================================')
    console.log('🔐 ログイン可能: test@piano-navi.com のみ')
    console.log('🔍 検索表示: 全ダミー教室が表示される')
    console.log('🎭 ダミー教室: ログイン不可（架空のowner_id）')
    console.log('==========================================')

  } catch (error) {
    console.error('エラーが発生しました:', error)
  }
}

// スクリプト実行
convertDummyClassrooms()
  .then(() => {
    console.log('\n🏁 変換処理が完了しました')
    process.exit(0)
  })
  .catch((error) => {
    console.error('変換処理でエラーが発生しました:', error)
    process.exit(1)
  }) 