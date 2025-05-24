import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'ピアノナビについて | サービス概要・会社情報',
  description: 'ピアノナビは、ピアノ教室と生徒をつなぐ専門プラットフォームです。私たちの理念、サービス内容、会社情報をご紹介します。',
}

export default function AboutPage() {
  const features = [
    {
      icon: '🎹',
      title: '専門特化',
      description: 'ピアノ教室に特化した検索・マッチングサービスで、より専門的で詳細な情報を提供します。'
    },
    {
      icon: '🔍',
      title: '詳細検索',
      description: '地域、年齢、レベル、曜日など、多角的な条件で理想の教室を見つけることができます。'
    },
    {
      icon: '✅',
      title: '信頼性',
      description: 'すべての掲載教室を事前審査し、正確で最新の情報をお届けします。'
    },
    {
      icon: '💰',
      title: '完全無料',
      description: '生徒様のサービス利用は完全無料。安心してご利用いただけます。'
    }
  ]

  const team = [
    {
      name: 'ABE（代表）',
      role: '代表取締役・プロダクトマネージャー',
      description: '音楽教育の民主化を目指し、テクノロジーで音楽教育の課題を解決することに情熱を注いでいます。',
      background: 'IT業界15年、音楽教育業界5年の経験'
    }
  ]

  const stats = [
    { label: '登録教室数', value: '1,000+', unit: '教室' },
    { label: 'マッチング実績', value: '5,000+', unit: '件' },
    { label: 'ユーザー数', value: '10,000+', unit: '人' },
    { label: 'サービス提供地域', value: '47', unit: '都道府県' }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      {/* ヒーローセクション */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            ピアノナビについて
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            私たちは、ピアノを学びたい人と質の高いピアノ教室をつなぐ専門プラットフォームです。
            音楽教育をより身近で accessible なものにすることが私たちの使命です。
          </p>
          <div className="bg-white rounded-lg shadow-lg p-8 max-w-4xl mx-auto">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Our Mission</h2>
            <p className="text-lg text-gray-700">
              「すべての人に最適なピアノ教育の機会を」<br />
              技術の力で音楽教育の課題を解決し、より多くの人がピアノを楽しめる世界を作ります。
            </p>
          </div>
        </div>
      </section>

      {/* 統計セクション */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            ピアノナビの実績
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl font-bold text-blue-600 mb-2">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-500 mb-1">{stat.unit}</div>
                <div className="text-gray-700 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* サービス特徴 */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              ピアノナビの特徴
            </h2>
            <p className="text-lg text-gray-600">
              他の教室検索サービスとは異なる、ピアノナビならではの価値
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg p-6 text-center">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* サービス詳細 */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                なぜピアノナビを作ったのか
              </h2>
              <div className="space-y-4 text-gray-700">
                <p>
                  音楽教育、特にピアノ教育は多くの人にとって憧れでありながら、
                  「どの教室を選べばいいかわからない」「自分に合った先生が見つからない」
                  といった課題がありました。
                </p>
                <p>
                  一方で、優秀な講師の方々が運営する素晴らしい教室も、
                  生徒募集に苦労されているケースが多く見られました。
                </p>
                <p>
                  この「学びたい人」と「教えたい人」のミスマッチを解決し、
                  より多くの人が音楽の喜びを感じられる社会を作りたい。
                  それがピアノナビ誕生のきっかけです。
                </p>
              </div>
            </div>
            <div className="bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg p-8">
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                私たちの価値観
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-medium mr-3 mt-0.5">
                    1
                  </span>
                  <span className="text-gray-700">
                    <strong>品質重視:</strong> 量より質を重視し、厳選された教室のみを掲載
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-medium mr-3 mt-0.5">
                    2
                  </span>
                  <span className="text-gray-700">
                    <strong>透明性:</strong> 料金や指導方針を明確に表示し、安心して選択できる環境
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-medium mr-3 mt-0.5">
                    3
                  </span>
                  <span className="text-gray-700">
                    <strong>サポート:</strong> マッチング後も継続的にサポートし、長期的な関係を支援
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* チーム紹介 */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              チーム紹介
            </h2>
            <p className="text-lg text-gray-600">
              音楽教育への情熱を持つメンバーが、より良いサービスを提供します
            </p>
          </div>
          <div className="grid md:grid-cols-1 lg:grid-cols-1 gap-8 max-w-2xl mx-auto">
            {team.map((member, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg p-8 text-center">
                <div className="w-24 h-24 bg-blue-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl font-bold text-blue-600">
                    {member.name.charAt(0)}
                  </span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {member.name}
                </h3>
                <p className="text-blue-600 font-medium mb-3">{member.role}</p>
                <p className="text-gray-600 mb-3">{member.description}</p>
                <p className="text-sm text-gray-500">{member.background}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 会社情報 */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            会社情報
          </h2>
          <div className="bg-gray-50 rounded-lg p-8">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">基本情報</h3>
                <dl className="space-y-3">
                  <div>
                    <dt className="text-sm font-medium text-gray-500">会社名</dt>
                    <dd className="text-gray-900">株式会社ピアノナビ</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">設立</dt>
                    <dd className="text-gray-900">2024年</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">代表者</dt>
                    <dd className="text-gray-900">代表取締役 ABE</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">事業内容</dt>
                    <dd className="text-gray-900">ピアノ教室検索プラットフォーム運営</dd>
                  </div>
                </dl>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">連絡先</h3>
                <dl className="space-y-3">
                  <div>
                    <dt className="text-sm font-medium text-gray-500">所在地</dt>
                    <dd className="text-gray-900">
                      〒100-0001<br />
                      東京都千代田区千代田1-1-1<br />
                      ピアノナビビル 3F
                    </dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">電話</dt>
                    <dd className="text-gray-900">0120-123-456</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">メール</dt>
                    <dd className="text-gray-900">info@piano-navi.com</dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA セクション */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              一緒にピアノ教育の未来を作りませんか？
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              教室運営者の方も、ピアノを学びたい方も、お気軽にお問い合わせください。
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/register"
                className="inline-flex items-center justify-center px-8 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition duration-200"
              >
                教室を掲載する
              </a>
              <a
                href="/contact"
                className="inline-flex items-center justify-center px-8 py-3 bg-gray-100 text-gray-700 font-medium rounded-md hover:bg-gray-200 transition duration-200"
              >
                お問い合わせ
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
} 