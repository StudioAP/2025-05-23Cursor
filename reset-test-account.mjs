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

async function resetTestAccount() {
  console.log('🔄 テストアカウントを本番らしい初期状態にリセット中...\n')

  const testEmail = 'test@piano-navi.com'

  try {
    // 1. テストユーザーのプロファイル情報を取得
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('id')
      .eq('email', testEmail)
      .single()

    if (profileError || !profile) {
      console.error('テストユーザーが見つかりません:', profileError)
      return
    }

    const userId = profile.id
    console.log(`👤 テストユーザーID: ${userId}`)

    // 2. テストユーザーが所有する教室を取得
    const { data: classroom, error: classroomError } = await supabase
      .from('classrooms')
      .select('id, name')
      .eq('owner_id', userId)
      .maybeSingle()

    if (classroom) {
      console.log(`🏫 削除対象教室: ${classroom.name} (ID: ${classroom.id})`)

      // 3. 教室に関連する決済情報を削除
      const { error: subscriptionDeleteError } = await supabase
        .from('subscriptions')
        .delete()
        .eq('classroom_id', classroom.id)

      if (subscriptionDeleteError) {
        console.error('決済情報削除エラー:', subscriptionDeleteError)
      } else {
        console.log('✅ 決済情報を削除しました')
      }

      // 4. 教室を削除
      const { error: classroomDeleteError } = await supabase
        .from('classrooms')
        .delete()
        .eq('id', classroom.id)

      if (classroomDeleteError) {
        console.error('教室削除エラー:', classroomDeleteError)
      } else {
        console.log('✅ 教室情報を削除しました')
      }
    } else {
      console.log('ℹ️  テストユーザーには教室が登録されていません')
    }

    // 5. 最終確認
    const { data: finalCheck } = await supabase
      .from('profiles')
      .select(`
        id,
        full_name,
        email,
        user_type,
        classrooms (
          id,
          name,
          status
        )
      `)
      .eq('id', userId)
      .single()

    console.log('\n🎉 テストアカウントリセット完了！')
    console.log('=====================================')
    console.log(`👤 ユーザー名: ${finalCheck.full_name}`)
    console.log(`📧 メールアドレス: ${finalCheck.email}`)
    console.log(`👔 アカウント種別: ${finalCheck.user_type}`)
    console.log(`🏫 登録済み教室数: ${finalCheck.classrooms?.length || 0}`)
    console.log('=====================================')

    if (finalCheck.classrooms?.length === 0) {
      console.log('\n✨ 本番同様の初期状態になりました！')
      console.log('📝 テストフロー:')
      console.log('   1. ログイン → 教室未登録状態のダッシュボード表示')
      console.log('   2. 教室情報入力フォームを表示')
      console.log('   3. 決済設定を促すフロー')
      console.log('   4. 公開設定')
    }

    console.log('\n🔐 テストアカウント情報')
    console.log('=====================================')
    console.log('📧 メールアドレス: test@piano-navi.com')
    console.log('🔑 パスワード: test123456')
    console.log('=====================================')

  } catch (error) {
    console.error('エラーが発生しました:', error)
  }
}

// スクリプト実行
resetTestAccount()
  .then(() => {
    console.log('\n🏁 リセット処理が完了しました')
    process.exit(0)
  })
  .catch((error) => {
    console.error('リセット処理でエラーが発生しました:', error)
    process.exit(1)
  }) 