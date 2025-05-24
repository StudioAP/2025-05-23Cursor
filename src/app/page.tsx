import Link from 'next/link'
import { Search, MapPin, Clock } from 'lucide-react'

export default function HomePage() {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-orange-50 to-yellow-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              あなたにぴったりの
              <br />
              <span className="text-orange-500">ピアノ教室</span>を見つけよう
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              全国のピアノ教室・リトミック教室から、エリアや特徴で簡単検索。
              お子様から大人まで、あなたの目的に合った教室が見つかります。
            </p>
            
            {/* Search Form */}
            <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-6 mb-8">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <label htmlFor="prefecture" className="block text-sm font-medium text-gray-700 mb-2">
                    都道府県
                  </label>
                  <select 
                    id="prefecture"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                  >
                    <option value="">選択してください</option>
                    <option value="tokyo">東京都</option>
                    <option value="osaka">大阪府</option>
                    <option value="kanagawa">神奈川県</option>
                    <option value="saitama">埼玉県</option>
                    <option value="chiba">千葉県</option>
                  </select>
                </div>
                <div className="flex-1">
                  <label htmlFor="keyword" className="block text-sm font-medium text-gray-700 mb-2">
                    キーワード
                  </label>
                  <input
                    type="text"
                    id="keyword"
                    placeholder="例：子供向け、初心者歓迎"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>
                <div className="flex items-end">
                  <Link
                    href="/search"
                    className="w-full md:w-auto bg-orange-500 text-white px-8 py-2 rounded-md hover:bg-orange-600 transition-colors flex items-center justify-center space-x-2"
                  >
                    <Search className="h-5 w-5" />
                    <span>検索</span>
                  </Link>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/search"
                className="bg-orange-500 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-orange-600 transition-colors"
              >
                教室を探す
              </Link>
              <Link
                href="/auth/register"
                className="bg-white text-orange-500 border-2 border-orange-500 px-8 py-3 rounded-lg text-lg font-semibold hover:bg-orange-50 transition-colors"
              >
                教室を掲載する
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              ピアノ教室ナビの特徴
            </h2>
            <p className="text-xl text-gray-600">
              簡単・便利・安心の教室検索サービス
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="h-8 w-8 text-orange-500" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                簡単検索
              </h3>
              <p className="text-gray-600">
                エリア、年齢、特徴など様々な条件で、あなたにぴったりの教室を簡単に見つけることができます。
              </p>
            </div>

            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="h-8 w-8 text-blue-500" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                全国対応
              </h3>
              <p className="text-gray-600">
                全国各地のピアノ教室・リトミック教室の情報を掲載。お住まいの地域の教室が見つかります。
              </p>
            </div>

            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="h-8 w-8 text-green-500" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                直接問い合わせ
              </h3>
              <p className="text-gray-600">
                気になる教室に直接問い合わせができます。体験レッスンの申し込みもスムーズです。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            教室運営者の方へ
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            月額500円で教室情報を掲載し、新しい生徒さんとの出会いを見つけませんか？
            簡単な登録で、すぐに教室情報を公開できます。
          </p>
          <Link
            href="/auth/register"
            className="bg-orange-500 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-orange-600 transition-colors inline-block"
          >
            教室掲載を始める
          </Link>
        </div>
      </section>
    </div>
  )
}
