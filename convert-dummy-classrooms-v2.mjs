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
    // 1. 架空のダミーユーザーを4つ作成
    const dummyUsers = []
    for (let i = 1; i <= 4; i++) {
      const dummyUserId = randomUUID()
      const dummyEmail = `dummy${i}@example.com`
      
      // 架空のプロファイルを作成
      const { data: newProfile, error: profileError } = await supabase
        .from('profiles')
        .insert({
          id: dummyUserId,
          full_name: `ダミーユーザー${i}`,
          email: dummyEmail,
          user_type: 'classroom_owner'
        })
        .select()
        .single()

      if (profileError) {
        console.log(`⚠️  ダミーユーザー${i}はすでに存在するかエラーです:`, profileError.message)
        // 既存のものを取得
        const { data: existingProfile } = await supabase
          .from('profiles')
          .select('id')
          .eq('email', dummyEmail)
          .single()
        
        if (existingProfile) {
          dummyUsers.push(existingProfile.id)
          console.log(`✅ 既存のダミーユーザー${i}を使用: ${existingProfile.id}`)
        }
      } else {
        dummyUsers.push(newProfile.id)
        console.log(`✅ ダミーユーザー${i}を作成: ${dummyEmail} (${newProfile.id})`)
      }
    }

    // 2. 現在のダミー教室を取得（テストアカウント以外の全教室）
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

    console.log(`\n📊 ダミー教室数: ${dummyClassrooms.length}件`)
    console.log(`👤 作成可能なダミーユーザー数: ${dummyUsers.length}人`)
    
    if (dummyClassrooms.length === 0) {
      console.log('ℹ️  変更対象のダミー教室がありません')
      return
    }

    // 3. 各ダミー教室のowner_idを架空のダミーユーザーに変更
    for (let i = 0; i < dummyClassrooms.length; i++) {
      const classroom = dummyClassrooms[i]
      const newOwnerId = dummyUsers[i % dummyUsers.length] // ダミーユーザーを循環使用
      
      console.log(`\n🏫 教室: ${classroom.name}`)
      console.log(`   現在のowner_id: ${classroom.owner_id}`)
      console.log(`   新しいowner_id: ${newOwnerId}`)

      // 教室のowner_idを更新
      const { error: updateError } = await supabase
        .from('classrooms')
        .update({ owner_id: newOwnerId })
        .eq('id', classroom.id)

      if (updateError) {
        console.error(`   ❌ 更新エラー: ${updateError.message}`)
      } else {
        console.log(`   ✅ 更新完了`)
      }
    }

    // 4. 最終確認
    const { data: finalClassrooms } = await supabase
      .from('classrooms')
      .select(`
        id,
        name,
        owner_id,
        status,
        published,
        profiles (
          email,
          full_name
        )
      `)
      .order('name')

    console.log('\n🎉 ダミー教室変換完了！')
    console.log('=====================================')
    
    finalClassrooms.forEach(classroom => {
      const isTestClassroom = classroom.profiles?.email === 'test@piano-navi.com'
      const isDummyUser = classroom.profiles?.email?.includes('@example.com')
      
      let status = '📝 テストアカウント用'
      if (isDummyUser) {
        status = '🎭 ダミー教室（架空ユーザー・ログイン不可）'
      } else if (!isTestClassroom) {
        status = '👤 実在ユーザー'
      }
      
      console.log(`🏫 ${classroom.name}`)
      console.log(`   ${status}`)
      console.log(`   オーナー: ${classroom.profiles?.full_name} (${classroom.profiles?.email})`)
      console.log(`   ステータス: ${classroom.status}`)
      console.log(`   公開状態: ${classroom.published ? '公開中' : '非公開'}`)
      console.log('')
    })

    console.log('📋 検索機能での表示状況:')
    const publishedCount = finalClassrooms.filter(c => c.published).length
    console.log(`   検索結果に表示される教室数: ${publishedCount}件`)
    
    console.log('\n✨ 設定完了')
    console.log('==========================================')
    console.log('🔐 ログイン可能: test@piano-navi.com のみ')
    console.log('🔍 検索表示: 全ダミー教室が表示される')
    console.log('🎭 ダミー教室: ログイン不可（架空ユーザー）')
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