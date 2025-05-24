import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'サービスについて・お問い合わせ | ピアノナビ',
  description: 'ピアノナビのサービス概要とお問い合わせ方法について。シンプルなピアノ教室検索プラットフォームです。',
}

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* サービス概要セクション */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              ピアノナビについて
            </h1>
            <p className="text-lg text-gray-600">
              ピアノ教室と生徒をつなぐシンプルな検索プラットフォームです
            </p>
          </div>

          <div className="space-y-8">
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                サービスの特徴
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="flex items-start space-x-3">
                  <div className="bg-blue-100 p-2 rounded-lg">
                    <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">簡単検索</h3>
                    <p className="text-gray-600 text-sm">地域や条件でピアノ教室を簡単に検索できます</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="bg-green-100 p-2 rounded-lg">
                    <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">信頼できる情報</h3>
                    <p className="text-gray-600 text-sm">教室の詳細情報を正確に掲載しています</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="bg-purple-100 p-2 rounded-lg">
                    <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">生徒は無料</h3>
                    <p className="text-gray-600 text-sm">教室検索・利用は完全無料です</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="bg-yellow-100 p-2 rounded-lg">
                    <svg className="w-5 h-5 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">教室掲載も簡単</h3>
                    <p className="text-gray-600 text-sm">教室運営者の方も簡単に掲載できます</p>
                  </div>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                なぜ始めたのか
              </h2>
              <p className="text-gray-700 leading-relaxed">
                「ピアノを習いたいけれど、どの教室を選べばいいかわからない」「近所にどんな教室があるのか知りたい」
                そんな声をよく聞くようになりました。一方で、素晴らしいピアノ教室を運営している先生方が、
                生徒募集に苦労されているケースも多く見られます。
              </p>
              <p className="text-gray-700 leading-relaxed mt-4">
                この「学びたい人」と「教えたい人」をシンプルにつなげるサービスがあれば、
                もっと多くの人がピアノの楽しさに出会えるのではないか。そんな思いでピアノナビを作りました。
              </p>
            </section>
          </div>
        </div>

        {/* お問い合わせセクション */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">
            お問い合わせ
          </h2>
          
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-8">
              <p className="text-gray-600">
                ご質問やご要望がございましたら、メールでお気軽にお問い合わせください
              </p>
            </div>

            <form className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  お名前
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="山田太郎"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  メールアドレス
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="example@email.com"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                  メッセージ
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="お問い合わせ内容をご記入ください..."
                />
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-3 px-6 rounded-md hover:bg-blue-700 transition duration-200 font-medium"
              >
                送信する
              </button>
            </form>

            <div className="mt-8 text-center">
              <div className="bg-gray-50 rounded-lg p-6">
                <div className="flex items-center justify-center mb-4">
                  <div className="bg-blue-100 p-3 rounded-lg">
                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">直接メールでも</h3>
                <p className="text-gray-600 mb-2">
                  <a href="mailto:contact@piano-navi.com" className="text-blue-600 hover:text-blue-700">
                    contact@piano-navi.com
                  </a>
                </p>
                <p className="text-sm text-gray-500">
                  通常24時間以内にお返事いたします
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 運営情報 */}
        <div className="mt-8 bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-semibold text-gray-900 text-center mb-6">
            運営情報
          </h2>
          <div className="text-center space-y-3 text-gray-700">
            <p><strong>サービス名：</strong>ピアノナビ</p>
            <p><strong>運営者：</strong>ABE</p>
            <p><strong>開始：</strong>2024年</p>
            <p><strong>事業内容：</strong>ピアノ教室検索プラットフォームの運営</p>
          </div>
        </div>
      </div>
    </div>
  )
} 