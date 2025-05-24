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

async function addImagesAndPricing() {
  console.log('📸 教室の画像と料金情報を追加中...\n')

  try {
    // すべての公開済み教室を取得
    const { data: classrooms, error: fetchError } = await supabase
      .from('classrooms')
      .select('*')
      .eq('status', 'published')

    if (fetchError) {
      console.error('教室データ取得エラー:', fetchError)
      return
    }

    // 画像と料金データセット
    const imageAndPricingData = [
      {
        // ABEピアノアカデミー
        email: 'test@piano-navi.com',
        data: {
          images: [
            'https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?w=800&h=600&fit=crop&crop=center',
            'https://images.unsplash.com/photo-1507838153414-b4b713384a76?w=800&h=600&fit=crop&crop=center',
            'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=800&h=600&fit=crop&crop=center'
          ],
          tuition_info: '【月謝制レッスン料金】\\n\\n■ 幼児コース（3歳〜6歳）\\n・月3回 30分レッスン：8,000円\\n・月4回 30分レッスン：10,000円\\n\\n■ 小学生コース\\n・月3回 45分レッスン：10,000円\\n・月4回 45分レッスン：12,000円\\n\\n■ 中学生・高校生コース\\n・月3回 45分レッスン：12,000円\\n・月4回 45分レッスン：15,000円\\n\\n■ 大人コース\\n・月2回 60分レッスン：12,000円\\n・月3回 60分レッスン：16,000円\\n\\n■ 音大受験コース\\n・月4回 60分レッスン：20,000円\\n\\n【その他費用】\\n・入会金：5,000円（キャンペーン中は無料）\\n・教材費：実費（1,500円〜3,000円程度）\\n・発表会参加費：8,000円（年1回・任意参加）',
          trial_lesson_info: '🎵 無料体験レッスン実施中！\\n\\n【体験レッスン内容】\\n・30分の個人レッスン\\n・現在のレベルチェック\\n・目標に合わせた指導プラン提案\\n・教室・設備のご案内\\n・料金システムのご説明\\n\\n【お申し込み方法】\\n📞 電話：03-3456-7890\\n📧 メール：test@piano-navi.com\\n🌐 ウェブサイト：https://abe-piano-academy.com\\n\\n【体験レッスン可能時間】\\n月〜土：10:00〜19:00（要予約）\\n\\n※体験レッスン後の入会は任意です\\n※しつこい勧誘は一切いたしません'
        }
      },
      {
        // さくらピアノ教室
        email: 'info@sakura-piano.com',
        data: {
          images: [
            'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&h=600&fit=crop&crop=center',
            'https://images.unsplash.com/photo-1571974599782-87624638275e?w=800&h=600&fit=crop&crop=center',
            'https://images.unsplash.com/photo-1556075798-4825dfaaf498?w=800&h=600&fit=crop&crop=center'
          ],
          tuition_info: '【月謝料金】\\n\\n■ 子どもコース\\n・幼児（3歳〜6歳）：月3回 30分 7,000円\\n・小学生：月3回 45分 8,500円\\n・中高生：月3回 45分 9,500円\\n\\n■ 大人コース\\n・初心者：月2回 45分 8,000円\\n・経験者：月3回 45分 11,000円\\n・ワンレッスン制：1回 60分 4,000円\\n\\n■ シニアコース（60歳以上）\\n・月2回 45分：7,000円\\n・月3回 45分：9,500円\\n\\n【その他】\\n・入会金：3,000円\\n・教材費：別途実費\\n・発表会費：5,000円（年1回）\\n\\n※家族割引：2人目以降月謝500円引き\\n※振替レッスン無料（当日連絡OK）',
          trial_lesson_info: '🌸 無料体験レッスン随時受付中！\\n\\n【体験レッスンの流れ】\\n1. ヒアリング（5分）\\n2. 実際のレッスン（20分）\\n3. 質疑応答・相談（5分）\\n\\n【持ち物】\\n特にありません！手ぶらでお越しください\\n\\n【予約方法】\\n📞 03-5468-1234\\n📧 info@sakura-piano.com\\n\\n【体験可能時間】\\n月・水・木・金：15:00〜20:00\\n土：9:00〜15:00\\n\\n※お子様連れOK！\\n※駐車場無料利用可能'
        }
      },
      {
        // ひまわり音楽教室
        email: 'contact@himawari-music.com',
        data: {
          images: [
            'https://images.unsplash.com/photo-1564186763535-ebb21ef5277f?w=800&h=600&fit=crop&crop=center',
            'https://images.unsplash.com/photo-1612225330812-01a9c6b355ec?w=800&h=600&fit=crop&crop=center',
            'https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?w=800&h=600&fit=crop&crop=center'
          ],
          tuition_info: '【ピアノコース料金】\\n\\n■ 個人レッスン\\n・幼児（2歳〜6歳）：月3回 30分 9,000円\\n・小学生：月4回 45分 12,000円\\n・中学生：月4回 45分 13,000円\\n・高校生：月4回 60分 15,000円\\n・大人：月3回 60分 14,000円\\n\\n■ グループレッスン（2〜3名）\\n・幼児：月3回 45分 6,000円/人\\n・小学生：月4回 60分 8,000円/人\\n\\n■ 専門コース\\n・音大受験：月4回 90分 25,000円\\n・コンクール対策：月4回 60分 18,000円\\n\\n■ その他コース\\n・リトミック：月3回 45分 7,000円\\n・ソルフェージュ：月2回 60分 8,000円\\n\\n【諸費用】\\n・入会金：8,000円\\n・設備費：月額1,000円\\n・発表会費：10,000円（年2回）',
          trial_lesson_info: '🌻 体験レッスン実施中！\\n\\n【体験レッスン料】\\n・個人レッスン：1,000円（30分）\\n・グループレッスン：500円（45分）\\n※入会時に全額キャッシュバック\\n\\n【体験内容】\\n・現在のレベル確認\\n・目標設定とプラン提案\\n・実際のレッスン体験\\n・教室見学\\n\\n【予約・お問い合わせ】\\n📞 06-6241-5678\\n📧 contact@himawari-music.com\\n\\n【体験可能日時】\\n火〜金：14:00〜19:00\\n土日：9:00〜17:00\\n\\n【特典】\\n・兄弟姉妹での体験は2人目以降無料\\n・当日入会で入会金半額'
        }
      },
      {
        // コスモスピアノスクール
        email: 'info@cosmos-piano.jp',
        data: {
          images: [
            'https://images.unsplash.com/photo-1582142306909-195724d6b4d7?w=800&h=600&fit=crop&crop=center',
            'https://images.unsplash.com/photo-1507838153414-b4b713384a76?w=800&h=600&fit=crop&crop=center',
            'https://images.unsplash.com/photo-1616628188540-57b8970c4c64?w=800&h=600&fit=crop&crop=center'
          ],
          tuition_info: '【レッスン料金】\\n\\n■ クラシックピアノ\\n・幼児（4歳〜6歳）：月3回 30分 8,500円\\n・小学生：月3回 45分 10,000円\\n・中高生：月3回 45分 11,500円\\n・大人：月2回 60分 10,000円\\n・大人：月3回 60分 14,000円\\n\\n■ ジャズピアノ\\n・初級：月2回 60分 12,000円\\n・中級：月3回 60分 16,000円\\n・上級：月3回 60分 18,000円\\n\\n■ ポピュラーピアノ\\n・月2回 60分：9,000円\\n・月3回 60分：12,500円\\n\\n■ シニアコース（65歳以上）\\n・月2回 45分：7,500円\\n・月3回 45分：10,000円\\n\\n【その他】\\n・入会金：5,000円\\n・教材費：実費\\n・ミニコンサート参加費：2,000円（月1回・任意）',
          trial_lesson_info: '🌼 無料体験レッスン＆教室見学！\\n\\n【体験レッスン内容】\\n・お一人お一人に合わせた45分のレッスン\\n・ジャンル選択可（クラシック・ジャズ・ポピュラー）\\n・楽譜の読み方から実践まで\\n・今後の学習プランご提案\\n\\n【見学ツアー】\\n・防音レッスン室見学\\n・楽器の説明\\n・駐車場のご案内\\n\\n【お申し込み】\\n📞 045-321-9876\\n📧 info@cosmos-piano.jp\\n\\n【体験可能時間】\\n月・火・木・金：13:00〜19:00\\n土：9:00〜15:00\\n\\n【特典】\\n・体験当日入会で入会金半額\\n・楽器購入相談無料'
        }
      },
      {
        // こぐまリトミックルーム
        email: 'koguma@ritmic-room.kyoto',
        data: {
          images: [
            'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=800&h=600&fit=crop&crop=center',
            'https://images.unsplash.com/photo-1612825173171-9b6eae4ba3f3?w=800&h=600&fit=crop&crop=center',
            'https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=800&h=600&fit=crop&crop=center'
          ],
          tuition_info: '【コース別料金】\\n\\n■ 親子リトミック（0歳〜3歳）\\n・月3回 45分：6,000円\\n・1回券：2,500円\\n※保護者1名+お子様1名の料金\\n※兄弟姉妹追加：+500円/人\\n\\n■ 幼児リトミック（3歳〜6歳）\\n・月3回 45分：7,000円\\n・月4回 45分：8,500円\\n\\n■ 小学生ピアノ（リトミック+ピアノ）\\n・月3回 45分：8,500円\\n・月4回 45分：10,000円\\n\\n■ 単発レッスン\\n・リトミック：1回 2,000円\\n・ピアノ：1回 2,500円\\n\\n【その他費用】\\n・入会金：3,000円（家族2人目以降無料）\\n・教材費：年間2,000円\\n・楽器レンタル代：月500円（希望者のみ）\\n\\n※見学無料・途中入会可・休会制度あり',
          trial_lesson_info: '🐻 無料体験レッスン＆見学会開催中！\\n\\n【体験内容】\\n・リトミック活動体験（20分）\\n・楽器遊び体験（10分）\\n・質疑応答・相談タイム（10分）\\n\\n【見学会】\\n・実際のレッスン見学\\n・お子様の様子観察\\n・保護者様のご質問にお答え\\n\\n【開催日時】\\n毎週土曜日 13:00〜14:00\\n※平日希望の方はご相談ください\\n\\n【予約・お問い合わせ】\\n📞 075-781-2345\\n📧 koguma@ritmic-room.kyoto\\n\\n【持ち物】\\n・動きやすい服装\\n・水分補給用飲み物\\n・上履き（大人・子供とも）\\n\\n【特典】\\n・当日入会で入会金半額\\n・お友達紹介割引あり'
        }
      }
    ]

    // 各教室の画像と料金情報を更新
    for (const imageData of imageAndPricingData) {
      // 対象教室を見つける
      const targetClassroom = classrooms.find(c => c.email === imageData.email)
      if (!targetClassroom) {
        console.log(`⚠️ ${imageData.email} の教室が見つかりません`)
        continue
      }

      // データを更新
      const { error: updateError } = await supabase
        .from('classrooms')
        .update(imageData.data)
        .eq('id', targetClassroom.id)

      if (updateError) {
        console.error(`❌ ${targetClassroom.name}の画像・料金更新エラー:`, updateError)
      } else {
        console.log(`✅ ${targetClassroom.name} 画像・料金情報更新完了`)
      }
    }

    console.log('\n🎉 すべての教室の画像・料金情報追加完了！')
    console.log('=====================================')
    console.log('📸 各教室に3枚ずつの画像を設定')
    console.log('💰 詳細な料金体系を設定')
    console.log('🎯 体験レッスン情報を詳細設定')
    console.log('=====================================')

    // 最終確認
    const { data: finalClassrooms, error: finalError } = await supabase
      .from('classrooms')
      .select('name, images, tuition_info, trial_lesson_info')
      .eq('status', 'published')

    if (!finalError) {
      console.log('\n📊 最終データ確認:')
      finalClassrooms.forEach((classroom, index) => {
        console.log(`${index + 1}. ${classroom.name}`)
        console.log(`   画像: ${classroom.images ? classroom.images.length : 0}枚`)
        console.log(`   料金情報: ${classroom.tuition_info ? '設定済み' : '未設定'}`)
        console.log(`   体験レッスン: ${classroom.trial_lesson_info ? '設定済み' : '未設定'}`)
      })
    }

  } catch (error) {
    console.error('エラーが発生しました:', error)
  }
}

addImagesAndPricing() 