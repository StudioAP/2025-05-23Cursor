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

async function createTestAccount() {
  console.log('🔧 テストアカウント作成中...\n')

  const testEmail = 'test@piano-navi.com'
  const testPassword = 'test123456'
  const testName = 'テスト太郎'

  try {
    // 1. Supabase Auth でアカウント作成
    const { data: authData, error: authError } = await supabase.auth.admin.createUser({
      email: testEmail,
      password: testPassword,
      email_confirm: true, // メール認証済みにする
      user_metadata: {
        full_name: testName,
        user_type: 'classroom_owner'
      }
    })

    if (authError) {
      console.error('認証アカウント作成エラー:', authError)
      return
    }

    console.log('✅ 認証アカウント作成成功')
    const userId = authData.user.id

    // 2. プロファイル作成
    const { error: profileError } = await supabase
      .from('profiles')
      .insert([{
        id: userId,
        full_name: testName,
        email: testEmail,
        user_type: 'classroom_owner'
      }])

    if (profileError) {
      console.error('プロファイル作成エラー:', profileError)
    } else {
      console.log('✅ プロファイル作成成功')
    }

    // 3. テスト教室作成
    const { data: classroomData, error: classroomError } = await supabase
      .from('classrooms')
      .insert([{
        name: 'テストピアノ教室',
        description: 'これはテスト用の教室です。実際の教室ではありません。',
        pr_points: '・テスト用教室\\n・動作確認専用\\n・実際の申し込み不可',
        prefecture: '東京都',
        city: 'テスト区',
        address: 'テスト1-1-1',
        phone: '03-0000-0000',
        email: testEmail,
        website_url: 'https://test.piano-navi.com',
        target_ages: ['小学生', '中学生', '大人'],
        available_days: ['月曜日', '水曜日', '金曜日'],
        status: 'published',
        owner_id: userId
      }])
      .select()

    if (classroomError) {
      console.error('教室作成エラー:', classroomError)
    } else {
      console.log('✅ テスト教室作成成功')

      // 4. アクティブな決済情報を追加
      const subscriptionEndDate = new Date()
      subscriptionEndDate.setMonth(subscriptionEndDate.getMonth() + 1)

      const { error: subscriptionError } = await supabase
        .from('subscriptions')
        .insert([{
          classroom_id: classroomData[0].id,
          status: 'active',
          current_period_end: subscriptionEndDate.toISOString()
        }])

      if (subscriptionError) {
        console.error('決済データ挿入エラー:', subscriptionError)
      } else {
        console.log('✅ 決済情報追加成功')
      }
    }

    console.log('\n🎉 テストアカウント作成完了！')
    console.log('=====================================')
    console.log(`📧 メールアドレス: ${testEmail}`)
    console.log(`🔑 パスワード: ${testPassword}`)
    console.log(`👤 名前: ${testName}`)
    console.log('=====================================')
    console.log('\n✨ このアカウントでログインテストができます！')

  } catch (error) {
    console.error('エラーが発生しました:', error)
  }
}

createTestAccount() 