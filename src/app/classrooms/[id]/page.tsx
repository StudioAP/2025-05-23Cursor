'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { supabase } from '@/lib/supabase-browser'
import { 
  ArrowLeft, 
  MapPin, 
  Phone, 
  Mail, 
  ExternalLink,
  Clock,
  User,
  Star,
  MessageCircle
} from 'lucide-react'
import Link from 'next/link'

interface Classroom {
  id: string
  name: string
  description: string
  prefecture: string
  city: string
  address: string
  phone: string
  email: string
  website_url: string
  target_ages: string[]
  available_days: string[]
  available_times: string
  instructor_info: string
  pr_points: string
  created_at: string
  updated_at: string
}

export default function ClassroomDetailPage() {
  const params = useParams()
  const classroomId = params.id as string
  
  const [classroom, setClassroom] = useState<Classroom | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    loadClassroom()
  }, [classroomId])

  const loadClassroom = async () => {
    try {
      const { data, error } = await supabase
        .from('classrooms')
        .select('*')
        .eq('id', classroomId)
        .eq('is_visible', true)
        .single()

      if (error || !data) {
        setError('教室情報が見つかりません。')
        return
      }

      setClassroom(data)
    } catch (error) {
      console.error('Error loading classroom:', error)
      setError('教室情報の読み込みに失敗しました。')
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div>
          <p className="mt-2 text-gray-600">読み込み中...</p>
        </div>
      </div>
    )
  }

  if (error || !classroom) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">教室が見つかりません</h1>
          <p className="text-gray-600 mb-6">{error}</p>
          <Link
            href="/search"
            className="inline-flex items-center px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            検索に戻る
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link
            href="/search"
            className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            検索に戻る
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <div className="border-b border-gray-200 pb-6 mb-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">{classroom.name}</h1>
            <div className="flex items-center text-gray-600 space-x-4">
              <div className="flex items-center">
                <MapPin className="h-5 w-5 mr-2" />
                <span>{classroom.prefecture} {classroom.city}</span>
              </div>
            </div>
          </div>

          {/* Description */}
          {classroom.description && (
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-3">教室について</h2>
              <p className="text-gray-700 leading-relaxed">{classroom.description}</p>
            </div>
          )}

          {/* PR Points */}
          {classroom.pr_points && (
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-3 flex items-center">
                <Star className="h-5 w-5 mr-2 text-orange-500" />
                アピールポイント
              </h2>
              <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                <p className="text-gray-700 leading-relaxed">{classroom.pr_points}</p>
              </div>
            </div>
          )}
        </div>

        {/* Details Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column */}
          <div className="space-y-6">
            {/* Instructor Info */}
            {classroom.instructor_info && (
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                  <User className="h-5 w-5 mr-2" />
                  講師について
                </h2>
                <p className="text-gray-700 leading-relaxed">{classroom.instructor_info}</p>
              </div>
            )}

            {/* Target Ages */}
            {classroom.target_ages && classroom.target_ages.length > 0 && (
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">対象年齢</h2>
                <div className="flex flex-wrap gap-2">
                  {classroom.target_ages.map((age, index) => (
                    <span
                      key={index}
                      className="inline-block bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full"
                    >
                      {age}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Schedule */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <Clock className="h-5 w-5 mr-2" />
                レッスン日時
              </h2>
              
              {classroom.available_days && classroom.available_days.length > 0 && (
                <div className="mb-4">
                  <h3 className="text-sm font-medium text-gray-700 mb-2">レッスン可能日</h3>
                  <div className="flex flex-wrap gap-2">
                    {classroom.available_days.map((day, index) => (
                      <span
                        key={index}
                        className="inline-block bg-green-100 text-green-800 text-sm px-3 py-1 rounded-full"
                      >
                        {day}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {classroom.available_times && (
                <div>
                  <h3 className="text-sm font-medium text-gray-700 mb-2">時間帯</h3>
                  <p className="text-gray-600">{classroom.available_times}</p>
                </div>
              )}
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Location */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <MapPin className="h-5 w-5 mr-2" />
                所在地
              </h2>
              <div className="space-y-2">
                <p className="text-gray-700">
                  <span className="font-medium">都道府県:</span> {classroom.prefecture}
                </p>
                <p className="text-gray-700">
                  <span className="font-medium">市区町村:</span> {classroom.city}
                </p>
                {classroom.address && (
                  <p className="text-gray-700">
                    <span className="font-medium">住所:</span> {classroom.address}
                  </p>
                )}
              </div>
            </div>

            {/* Contact */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <MessageCircle className="h-5 w-5 mr-2" />
                お問い合わせ
              </h2>
              <div className="space-y-4">
                <div className="flex items-center">
                  <Mail className="h-5 w-5 text-gray-400 mr-3" />
                  <a
                    href={`mailto:${classroom.email}`}
                    className="text-orange-600 hover:text-orange-700 transition-colors break-all"
                  >
                    {classroom.email}
                  </a>
                </div>

                {classroom.phone && (
                  <div className="flex items-center">
                    <Phone className="h-5 w-5 text-gray-400 mr-3" />
                    <a
                      href={`tel:${classroom.phone}`}
                      className="text-orange-600 hover:text-orange-700 transition-colors"
                    >
                      {classroom.phone}
                    </a>
                  </div>
                )}

                {classroom.website_url && (
                  <div className="flex items-center">
                    <ExternalLink className="h-5 w-5 text-gray-400 mr-3" />
                    <a
                      href={classroom.website_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-orange-600 hover:text-orange-700 transition-colors break-all"
                    >
                      {classroom.website_url}
                    </a>
                  </div>
                )}
              </div>
            </div>

            {/* Contact CTA */}
            <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg p-6 text-white">
              <h3 className="text-lg font-semibold mb-2">お気軽にお問い合わせください</h3>
              <p className="text-orange-100 text-sm mb-4">
                体験レッスンやご質問など、まずはお気軽にご連絡ください。
              </p>
              <a
                href={`mailto:${classroom.email}?subject=${encodeURIComponent(`${classroom.name}について`)}`}
                className="inline-flex items-center bg-white text-orange-600 px-4 py-2 rounded-md font-medium hover:bg-orange-50 transition-colors"
              >
                <Mail className="h-4 w-4 mr-2" />
                メールで問い合わせる
              </a>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center">
          <Link
            href="/search"
            className="inline-flex items-center px-6 py-3 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            他の教室も見る
          </Link>
        </div>
      </div>
    </div>
  )
} 