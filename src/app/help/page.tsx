import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'ヘルプ・よくあるご質問 | ピアノナビ',
  description: 'ピアノナビの使い方、よくあるご質問、トラブルシューティングガイドをご覧いただけます。',
}

export default function HelpPage() {
  const faqs = [
    {
      category: '教室を探す方向け',
      questions: [
        {
          q: 'ピアノ教室はどうやって検索できますか？',
          a: 'トップページの検索機能で、都道府県・市区町村・対象年齢・曜日などの条件を設定して検索できます。詳細条件を設定することで、よりご希望に合った教室を見つけることができます。'
        },
        {
          q: '体験レッスンの申し込み方法を教えてください。',
          a: '各教室の詳細ページから体験レッスンの申し込みができます。教室によって申し込み方法（電話・メール・Webフォーム）が異なりますので、詳細ページでご確認ください。'
        },
        {
          q: '検索結果に表示される教室の情報はどこまで信頼できますか？',
          a: 'ピアノナビに掲載されている教室は、すべて運営者による審査を通過した教室です。また、各教室の情報は定期的に更新・確認を行っています。'
        },
        {
          q: '料金はかかりますか？',
          a: 'ピアノナビのサービス利用は完全無料です。教室検索、体験レッスンの申し込み、お問い合わせなど、すべてのサービスを無料でご利用いただけます。'
        }
      ]
    },
    {
      category: '教室運営者向け',
      questions: [
        {
          q: '教室の掲載方法を教えてください。',
          a: '「教室を掲載する」ボタンから新規登録を行ってください。アカウント作成後、教室情報の入力、審査、決済手続きを経て掲載開始となります。'
        },
        {
          q: '掲載料金はいくらですか？',
          a: '月額2,980円（税込）で教室情報を掲載できます。初月は無料でお試しいただけます。年間プランもご用意しており、よりお得にご利用いただけます。'
        },
        {
          q: '教室情報の変更方法は？',
          a: 'ログイン後のダッシュボードから、教室情報の編集・変更ができます。料金、時間帯、講師情報など、いつでも最新の情報に更新可能です。'
        },
        {
          q: '退会・解約方法を教えてください。',
          a: 'ダッシュボードの設定メニューから退会手続きができます。退会後は掲載が停止され、翌月からの課金は発生しません。'
        }
      ]
    },
    {
      category: '技術的な問題',
      questions: [
        {
          q: 'メール認証ができません。',
          a: '認証メールが届かない場合は、迷惑メールフォルダをご確認ください。それでも届かない場合は、メールアドレスが正しく入力されているか確認の上、再送信をお試しください。'
        },
        {
          q: 'パスワードを忘れました。',
          a: 'ログインページの「パスワードを忘れた方」からパスワードリセットができます。登録済みのメールアドレスに案内メールをお送りします。'
        },
        {
          q: 'スマートフォンで正常に表示されません。',
          a: 'ブラウザのキャッシュをクリアしてから再度アクセスしてみてください。問題が解決しない場合は、ブラウザのバージョンを最新にしてお試しください。'
        },
        {
          q: '検索結果が表示されません。',
          a: '検索条件を緩和してお試しください。特定の地域に教室が少ない場合があります。また、ブラウザを更新してから再度検索してみてください。'
        }
      ]
    }
  ]

  const guides = [
    {
      title: '教室を探す方へ',
      description: '理想のピアノ教室を見つけるためのガイド',
      items: [
        '効果的な検索方法',
        '教室選びのポイント',
        '体験レッスンの活用法',
        '料金比較のコツ'
      ]
    },
    {
      title: '教室運営者の方へ',
      description: '教室掲載から生徒募集までのサポート',
      items: [
        '掲載申込みの流れ',
        '魅力的な教室ページの作り方',
        '生徒からの問い合わせ対応',
        '決済・請求について'
      ]
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            ヘルプ・よくあるご質問
          </h1>
          <p className="text-lg text-gray-600">
            ピアノナビの使い方でご不明な点がございましたら、こちらをご確認ください
          </p>
        </div>

        {/* クイックガイド */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {guides.map((guide, index) => (
            <div key={index} className="bg-white rounded-lg shadow-lg p-8">
              <div className="flex items-center mb-4">
                <div className="bg-blue-100 p-3 rounded-lg mr-4">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">{guide.title}</h3>
                  <p className="text-gray-600 text-sm mt-1">{guide.description}</p>
                </div>
              </div>
              <ul className="space-y-2">
                {guide.items.map((item, itemIndex) => (
                  <li key={itemIndex} className="flex items-center text-gray-700">
                    <svg className="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* よくあるご質問 */}
        <div className="space-y-8">
          {faqs.map((category, categoryIndex) => (
            <div key={categoryIndex} className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center">
                <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm font-medium mr-3">
                  {category.category}
                </span>
              </h2>
              <div className="space-y-6">
                {category.questions.map((faq, faqIndex) => (
                  <div key={faqIndex} className="border-b border-gray-200 pb-6 last:border-b-0 last:pb-0">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-start">
                      <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-medium mr-3 mt-0.5">
                        Q
                      </span>
                      {faq.q}
                    </h3>
                    <div className="flex items-start">
                      <span className="bg-green-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-medium mr-3 mt-0.5">
                        A
                      </span>
                      <p className="text-gray-700 leading-relaxed">{faq.a}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* お問い合わせセクション */}
        <div className="mt-12 bg-white rounded-lg shadow-lg p-8 text-center">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            解決しない問題がありますか？
          </h2>
          <p className="text-gray-600 mb-6">
            こちらで解決しない場合は、お気軽にお問い合わせください。専門スタッフが迅速にサポートいたします。
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact"
              className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition duration-200"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              お問い合わせ
            </a>
            <a
              href="mailto:support@piano-navi.com"
              className="inline-flex items-center justify-center px-6 py-3 bg-gray-100 text-gray-700 font-medium rounded-md hover:bg-gray-200 transition duration-200"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
              </svg>
              メールで問い合わせ
            </a>
          </div>
        </div>
      </div>
    </div>
  )
} 