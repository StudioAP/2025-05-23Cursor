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

async function upgradeAllDummyClassrooms() {
  console.log('🎵 すべてのダミー教室データを詳細情報で更新中...\n')

  try {
    // 1. すべての公開済み教室を取得（テスト教室以外）
    const { data: classrooms, error: fetchError } = await supabase
      .from('classrooms')
      .select('*')
      .eq('status', 'published')
      .neq('email', 'test@piano-navi.com')

    if (fetchError) {
      console.error('教室データ取得エラー:', fetchError)
      return
    }

    console.log(`📝 ${classrooms.length}件の教室を更新します\n`)

    // 2. 各教室の詳細情報を設定
    const classroomUpdates = [
      {
        name: 'さくらピアノ教室',
        description: '東京都渋谷区にある温かい雰囲気のピアノ教室です。3歳から大人まで、一人ひとりのペースに合わせて丁寧に指導いたします。クラシックからポピュラーまで幅広いジャンルに対応しており、楽しく音楽を学べる環境を提供しています。',
        pr_points: '🌸 教室の特色\\n・3歳から80歳まで幅広い年齢層が通学\\n・初心者大歓迎！楽譜が読めなくても安心\\n・月謝制で安心の料金体系\\n・年1回の発表会で成果を披露\\n・振替レッスン対応（当日でもOK）\\n・グランドピアノでのレッスン\\n・渋谷駅から徒歩8分の好立地\\n・無料駐車場完備\\n・体験レッスン無料実施中',
        prefecture: '東京都',
        city: '渋谷区',
        address: '渋谷3-12-5 さくらビル4F',
        phone: '03-5468-1234',
        email: 'info@sakura-piano.com',
        website_url: 'https://sakura-piano.com',
        target_ages: ['3歳〜6歳', '小学生', '中学生', '高校生', '大人', 'シニア'],
        available_days: ['月曜日', '水曜日', '木曜日', '金曜日', '土曜日']
      },
      {
        name: 'ひまわり音楽教室',
        description: '大阪市中央区にある総合音楽教室です。ピアノをはじめ、声楽、リトミックなど様々なコースをご用意しています。音大受験対応から趣味まで、一人ひとりの目標に合わせた個別指導で、音楽の素晴らしさを伝えています。',
        pr_points: '🌻 教室の魅力\\n・音大卒の専門講師陣による質の高い指導\\n・個人レッスン・グループレッスン選択可能\\n・コンクール対策・音大受験対応\\n・リトミック・ソルフェージュも充実\\n・防音完備の快適レッスン室\\n・年2回の大きな発表会開催\\n・地下鉄各線からアクセス良好\\n・兄弟割引・家族割引あり\\n・無料体験レッスン随時受付',
        prefecture: '大阪府',
        city: '大阪市中央区',
        address: '心斎橋筋2-8-11 ひまわりビル3F',
        phone: '06-6241-5678',
        email: 'contact@himawari-music.com',
        website_url: 'https://himawari-music.com',
        target_ages: ['2歳〜6歳', '小学生', '中学生', '高校生', '大人'],
        available_days: ['火曜日', '水曜日', '木曜日', '金曜日', '土曜日', '日曜日']
      },
      {
        name: 'コスモスピアノスクール',
        description: '横浜市西区の閑静な住宅街にあるアットホームなピアノ教室です。クラシックピアノを中心に、ジャズやポピュラーも学べます。音楽を通じて豊かな感性を育み、生涯にわたって音楽を楽しめる基礎作りをサポートします。',
        pr_points: '🌼 スクールの強み\\n・少人数制できめ細やかな指導\\n・クラシック・ジャズ・ポピュラー対応\\n・音楽理論もしっかり学習\\n・コンクール入賞者多数輩出\\n・大人のピアノサークル活動\\n・月1回のミニコンサート開催\\n・横浜駅から電車で10分\\n・専用駐車場3台完備\\n・楽器購入サポートあり',
        prefecture: '神奈川県',
        city: '横浜市西区',
        address: '岡野1-15-20 コスモスマンション1F',
        phone: '045-321-9876',
        email: 'info@cosmos-piano.jp',
        website_url: 'https://cosmos-piano.jp',
        target_ages: ['4歳〜6歳', '小学生', '中学生', '高校生', '大人', 'シニア'],
        available_days: ['月曜日', '火曜日', '木曜日', '金曜日', '土曜日']
      },
      {
        name: 'こぐまリトミックルーム',
        description: '京都市北区の自然豊かな環境にある、リトミックとピアノの専門教室です。特に幼児教育に力を入れており、音楽を通じてお子様の創造性と表現力を育てます。親子で参加できるクラスも人気です。',
        pr_points: '🐻 教室の特徴\\n・リトミック専門資格講師による指導\\n・0歳から参加可能な親子クラス\\n・少人数制でアットホームな雰囲気\\n・季節の歌や手遊びを豊富に取り入れ\\n・楽器体験コーナー充実\\n・お子様の成長記録をお渡し\\n・京都市営地下鉄から徒歩5分\\n・ベビーカー置き場完備\\n・見学・体験随時受付中',
        prefecture: '京都府',
        city: '京都市北区',
        address: '上賀茂神社町25-8 こぐまハウス2F',
        phone: '075-781-2345',
        email: 'koguma@ritmic-room.kyoto',
        website_url: 'https://koguma-ritmic.kyoto',
        target_ages: ['0歳〜3歳', '3歳〜6歳', '小学生'],
        available_days: ['月曜日', '火曜日', '水曜日', '金曜日', '土曜日']
      }
    ]

    // 3. 各教室を順番に更新
    for (let i = 0; i < Math.min(classrooms.length, classroomUpdates.length); i++) {
      const classroom = classrooms[i]
      const updateData = classroomUpdates[i]

      const { error: updateError } = await supabase
        .from('classrooms')
        .update({
          name: updateData.name,
          description: updateData.description,
          pr_points: updateData.pr_points,
          prefecture: updateData.prefecture,
          city: updateData.city,
          address: updateData.address,
          phone: updateData.phone,
          email: updateData.email,
          website_url: updateData.website_url,
          target_ages: updateData.target_ages,
          available_days: updateData.available_days,
          status: 'published' // 確実に公開状態にする
        })
        .eq('id', classroom.id)

      if (updateError) {
        console.error(`❌ ${updateData.name}の更新エラー:`, updateError)
      } else {
        console.log(`✅ ${updateData.name} 更新完了`)
      }
    }

    // 4. すべての教室の決済期限を延長（検索表示確実化）
    console.log('\n💳 すべての教室の決済期限を延長中...')
    
    const extendedEndDate = new Date()
    extendedEndDate.setMonth(extendedEndDate.getMonth() + 3)

    const { error: subscriptionUpdateError } = await supabase
      .from('subscriptions')
      .update({
        current_period_end: extendedEndDate.toISOString(),
        status: 'active' // 確実にアクティブにする
      })
      .eq('status', 'active')

    if (subscriptionUpdateError) {
      console.error('決済情報更新エラー:', subscriptionUpdateError)
    } else {
      console.log('✅ すべての決済期限を3ヶ月延長完了')
    }

    // 5. 最終確認 - 検索可能な教室をリスト表示
    const { data: finalClassrooms, error: finalError } = await supabase
      .from('classrooms')
      .select(`
        *,
        subscriptions!inner (
          status,
          current_period_end
        )
      `)
      .eq('status', 'published')
      .eq('subscriptions.status', 'active')

    if (finalError) {
      console.error('最終確認エラー:', finalError)
    } else {
      console.log('\n🎉 すべてのダミー教室データ更新完了！')
      console.log('=========================================')
      console.log('📍 検索可能な教室一覧:')
      
      finalClassrooms.forEach((classroom, index) => {
        console.log(`${index + 1}. ${classroom.name}`)
        console.log(`   📍 ${classroom.prefecture} ${classroom.city} ${classroom.address}`)
        console.log(`   📞 ${classroom.phone}`)
        console.log(`   📧 ${classroom.email}`)
        console.log(`   🌐 ${classroom.website_url}`)
        console.log(`   👥 ${classroom.target_ages.join(', ')}`)
        console.log(`   📅 ${classroom.available_days.join(', ')}`)
        console.log(`   💳 決済期限: ${new Date(classroom.subscriptions[0].current_period_end).toLocaleDateString()}`)
        console.log('')
      })
      
      console.log('=========================================')
      console.log(`✨ 合計${finalClassrooms.length}件の教室が検索結果に表示されます！`)
    }

  } catch (error) {
    console.error('エラーが発生しました:', error)
  }
}

upgradeAllDummyClassrooms() 