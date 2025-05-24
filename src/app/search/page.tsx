'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Search, MapPin, Phone, Mail, Globe } from 'lucide-react'
import { supabase } from '@/lib/supabase-browser'
import { Database } from '@/types/database'

type Classroom = Database['public']['Tables']['classrooms']['Row'] & {
  classroom_photos: Database['public']['Tables']['classroom_photos']['Row'][]
}

const PREFECTURES = [
  '北海道', '青森県', '岩手県', '宮城県', '秋田県', '山形県', '福島県',
  '茨城県', '栃木県', '群馬県', '埼玉県', '千葉県', '東京都', '神奈川県',
  '新潟県', '富山県', '石川県', '福井県', '山梨県', '長野県', '岐阜県',
  '静岡県', '愛知県', '三重県', '滋賀県', '京都府', '大阪府', '兵庫県',
  '奈良県', '和歌山県', '鳥取県', '島根県', '岡山県', '広島県', '山口県',
  '徳島県', '香川県', '愛媛県', '高知県', '福岡県', '佐賀県', '長崎県',
  '熊本県', '大分県', '宮崎県', '鹿児島県', '沖縄県'
]

const TARGET_AGES = [
  '0-3歳', '3-6歳', '小学生', '中学生', '高校生', '大人', 'シニア'
]

const AVAILABLE_DAYS = [
  '月曜日', '火曜日', '水曜日', '木曜日', '金曜日', '土曜日', '日曜日'
]

export default function SearchPage() {
  const [classrooms, setClassrooms] = useState<Classroom[]>([])
  const [loading, setLoading] = useState(true)
  const [searchParams, setSearchParams] = useState({
    prefecture: '',
    city: '',
    keyword: '',
    targetAge: '',
    availableDay: ''
  })

  const fetchClassrooms = async () => {
    setLoading(true)
    
    let query = supabase
      .from('classrooms')
      .select(`
        *,
        classroom_photos (*),
        subscriptions!inner (
          id,
          status,
          current_period_end
        )
      `)
      .eq('status', 'published')
      .eq('subscriptions.status', 'active')
      .gte('subscriptions.current_period_end', new Date().toISOString())

    // Apply filters
    if (searchParams.prefecture) {
      query = query.eq('prefecture', searchParams.prefecture)
    }
    
    if (searchParams.city) {
      query = query.ilike('city', `%${searchParams.city}%`)
    }

    if (searchParams.keyword) {
      query = query.or(`name.ilike.%${searchParams.keyword}%,description.ilike.%${searchParams.keyword}%,pr_points.ilike.%${searchParams.keyword}%`)
    }

    if (searchParams.targetAge) {
      query = query.contains('target_ages', [searchParams.targetAge])
    }

    if (searchParams.availableDay) {
      query = query.contains('available_days', [searchParams.availableDay])
    }

    const { data, error } = await query.order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching classrooms:', error)
      console.error('Error details:', {
        message: error.message,
        details: error.details,
        hint: error.hint,
        code: error.code
      })
    } else {
      setClassrooms(data || [])
    }
    
    setLoading(false)
  }

  useEffect(() => {
    fetchClassrooms()
  }, [searchParams])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    fetchClassrooms()
  }

  const updateSearchParam = (key: string, value: string) => {
    setSearchParams(prev => ({ ...prev, [key]: value }))
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Search Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">教室を探す</h1>
          
          <form onSubmit={handleSearch} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              <div>
                <label htmlFor="prefecture" className="block text-sm font-medium text-gray-700 mb-1">
                  都道府県
                </label>
                <select
                  id="prefecture"
                  value={searchParams.prefecture}
                  onChange={(e) => updateSearchParam('prefecture', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                >
                  <option value="">すべて</option>
                  {PREFECTURES.map(prefecture => (
                    <option key={prefecture} value={prefecture}>{prefecture}</option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                  市区町村
                </label>
                <input
                  type="text"
                  id="city"
                  value={searchParams.city}
                  onChange={(e) => updateSearchParam('city', e.target.value)}
                  placeholder="例：渋谷区"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>

              <div>
                <label htmlFor="keyword" className="block text-sm font-medium text-gray-700 mb-1">
                  キーワード
                </label>
                <input
                  type="text"
                  id="keyword"
                  value={searchParams.keyword}
                  onChange={(e) => updateSearchParam('keyword', e.target.value)}
                  placeholder="例：初心者歓迎"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>

              <div>
                <label htmlFor="targetAge" className="block text-sm font-medium text-gray-700 mb-1">
                  対象年齢
                </label>
                <select
                  id="targetAge"
                  value={searchParams.targetAge}
                  onChange={(e) => updateSearchParam('targetAge', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                >
                  <option value="">すべて</option>
                  {TARGET_AGES.map(age => (
                    <option key={age} value={age}>{age}</option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="availableDay" className="block text-sm font-medium text-gray-700 mb-1">
                  曜日
                </label>
                <select
                  id="availableDay"
                  value={searchParams.availableDay}
                  onChange={(e) => updateSearchParam('availableDay', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                >
                  <option value="">すべて</option>
                  {AVAILABLE_DAYS.map(day => (
                    <option key={day} value={day}>{day}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex justify-center">
              <button
                type="submit"
                className="bg-orange-500 text-white px-8 py-2 rounded-md hover:bg-orange-600 transition-colors flex items-center space-x-2"
              >
                <Search className="h-5 w-5" />
                <span>検索</span>
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Results */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div>
            <p className="mt-2 text-gray-600">検索中...</p>
          </div>
        ) : (
          <>
            <div className="mb-6">
              <p className="text-gray-600">
                {classrooms.length}件の教室が見つかりました
              </p>
            </div>

            {classrooms.length === 0 ? (
              <div className="text-center py-16">
                <div className="max-w-md mx-auto">
                  <div className="bg-orange-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Search className="h-10 w-10 text-orange-500" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    ご希望の条件では教室が見つかりませんでした
                  </h3>
                  <p className="text-gray-600 mb-6">
                    条件を少し緩めると教室が表示されることがあります。<br />
                    または、お住まいの地域に新しい教室が掲載されるまでお待ちください。
                  </p>
                  <div className="space-y-4">
                    <div className="bg-blue-50 rounded-lg p-4 text-left mb-4">
                      <h4 className="font-medium text-blue-800 mb-2">検索のヒント</h4>
                      <ul className="text-sm text-blue-700 list-disc pl-5 space-y-1">
                        <li>都道府県のみを選択して、市区町村は空欄にしてみる</li>
                        <li>対象年齢や曜日の条件を外してみる</li>
                        <li>キーワードをより一般的な言葉に変更してみる</li>
                      </ul>
                    </div>
                    <button
                      onClick={() => {
                        setSearchParams({
                          prefecture: '',
                          city: '',
                          keyword: '',
                          targetAge: '',
                          availableDay: ''
                        })
                      }}
                      className="w-full bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600 transition-colors font-medium flex items-center justify-center space-x-2"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                      </svg>
                      <span>検索条件をリセットして再検索</span>
                    </button>
                    <p className="text-sm text-gray-500">
                      または、メールアドレスを登録して新着教室の通知を受け取ることができます
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {classrooms.map((classroom) => (
                  <div key={classroom.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                    {/* Image */}
                    <div className="h-48 bg-gray-200 relative">
                      {classroom.classroom_photos && classroom.classroom_photos.length > 0 ? (
                        <img
                          src={classroom.classroom_photos[0].photo_url}
                          alt={classroom.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <span className="text-gray-400">画像なし</span>
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        {classroom.name}
                      </h3>
                      
                      <div className="flex items-center text-gray-600 mb-2">
                        <MapPin className="h-4 w-4 mr-1" />
                        <span className="text-sm">
                          {classroom.prefecture} {classroom.city}
                        </span>
                      </div>

                      {classroom.target_ages && classroom.target_ages.length > 0 && (
                        <div className="mb-3">
                          <div className="flex flex-wrap gap-1">
                            {classroom.target_ages.map((age, index) => (
                              <span
                                key={index}
                                className="inline-block bg-orange-100 text-orange-800 text-xs px-2 py-1 rounded"
                              >
                                {age}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      {classroom.description && (
                        <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                          {classroom.description}
                        </p>
                      )}

                      <div className="flex items-center justify-between">
                        <div className="flex space-x-2">
                          {classroom.phone && (
                            <Phone className="h-4 w-4 text-gray-400" />
                          )}
                          {classroom.email && (
                            <Mail className="h-4 w-4 text-gray-400" />
                          )}
                          {classroom.website_url && (
                            <Globe className="h-4 w-4 text-gray-400" />
                          )}
                        </div>
                        
                        <Link
                          href={`/classrooms/${classroom.id}`}
                          className="bg-orange-500 text-white px-4 py-2 rounded text-sm hover:bg-orange-600 transition-colors"
                        >
                          詳細を見る
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}  