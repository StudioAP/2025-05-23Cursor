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

async function finalTestUpgrade() {
  console.log('🎯 テストアカウントの最終仕上げ...\n')

  const testEmail = 'test@piano-navi.com'

  try {
    // テストアカウントのユーザーIDを取得
    const { data: profile } = await supabase
      .from('profiles')
      .select('id')
      .eq('email', testEmail)
      .single()

    if (!profile) {
      console.error('❌ テストアカウントが見つかりません')
      return
    }

    const userId = profile.id

    // 既存のテスト教室を取得
    const { data: existingClassroom } = await supabase
      .from('classrooms')
      .select('id')
      .eq('owner_id', userId)
      .single()

    if (!existingClassroom) {
      console.error('❌ テスト教室が見つかりません')
      return
    }

    const classroomId = existingClassroom.id

    // 存在するカラムのみで教室情報を更新
    const { error: classroomUpdateError } = await supabase
      .from('classrooms')
      .update({
        name: 'ABEピアノアカデミー',
        description: '創立15年の実績あるピアノ教室です。初心者から音大受験まで幅広く対応しており、生徒一人ひとりの目標に合わせたきめ細やかな指導を行っています。アットホームな雰囲気の中で、音楽の楽しさと技術の両方を身につけることができます。',
        pr_points: '🎵 特徴・強み\\n・経験豊富な講師陣（音大卒・コンクール受賞歴あり）\\n・個人レッスン中心で一人ひとりに合わせた指導\\n・年2回の発表会で成長を実感\\n・グランドピアノ完備の防音レッスン室\\n・無料体験レッスン随時受付\\n・振替レッスン対応可能\\n・コンクール・グレード試験対策も充実\\n・大人の趣味コースも人気\\n・駐車場3台完備でアクセス良好',
        prefecture: '東京都',
        city: '世田谷区',
        address: '成城2-15-8 ABEビル2F',
        phone: '03-3456-7890',
        email: testEmail,
        website_url: 'https://abe-piano-academy.com',
        target_ages: ['3歳〜6歳', '小学生', '中学生', '高校生', '大人', 'シニア'],
        available_days: ['月曜日', '火曜日', '水曜日', '木曜日', '金曜日', '土曜日'],
        status: 'published'
      })
      .eq('id', classroomId)

    if (classroomUpdateError) {
      console.error('教室情報更新エラー:', classroomUpdateError)
    } else {
      console.log('✅ 教室情報を詳細内容に更新完了')
    }

    // 最終確認
    const { data: finalClassroom, error: finalError } = await supabase
      .from('classrooms')
      .select(`
        *,
        subscriptions!inner (
          status,
          current_period_end
        )
      `)
      .eq('id', classroomId)
      .eq('subscriptions.status', 'active')
      .single()

    if (finalError) {
      console.error('最終確認エラー:', finalError)
    } else {
      console.log('\n🎉 テストアカウント完全セットアップ完了！')
      console.log('=====================================')
      console.log(`🏫 教室名: ${finalClassroom.name}`)
      console.log(`📍 住所: ${finalClassroom.prefecture} ${finalClassroom.city} ${finalClassroom.address}`)
      console.log(`📞 電話: ${finalClassroom.phone}`)
      console.log(`📧 メール: ${finalClassroom.email}`)
      console.log(`🌐 ウェブサイト: ${finalClassroom.website_url}`)
      console.log(`👥 対象年齢: ${finalClassroom.target_ages.join(', ')}`)
      console.log(`📅 レッスン曜日: ${finalClassroom.available_days.join(', ')}`)
      console.log(`📊 ステータス: ${finalClassroom.status} (公開中)`)
      console.log(`💳 決済: ${finalClassroom.subscriptions[0].status} (期限: ${new Date(finalClassroom.subscriptions[0].current_period_end).toLocaleDateString()})`)
      console.log('=====================================')
      console.log('\n✨ 検索結果に表示され、すべての機能がテスト可能な状態です！')
    }

  } catch (error) {
    console.error('エラーが発生しました:', error)
  }
}

finalTestUpgrade() 