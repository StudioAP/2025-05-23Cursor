'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { supabase } from '@/lib/supabase-browser'
import { 
  School, 
  DollarSign, 
  Plus, 
  CreditCard,
  Edit
} from 'lucide-react'
import ProgressSteps from '@/components/dashboard/ProgressSteps'
export default function DashboardPage() {
  const [profile, setProfile] = useState<any>(null)
  const [classroom, setClassroom] = useState<any>(null)
  const [paymentStatus, setPaymentStatus] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [updating, setUpdating] = useState(false)
  const router = useRouter()

  useEffect(() => {
    checkUser()
  }, [])

  const checkUser = async () => {
    try {
      const { data: { user }, error } = await supabase.auth.getUser()
      
      if (error || !user) {
        router.push('/auth/login')
        return
      }

      // Get user profile
      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single()

      if (profileError || !profileData) {
        console.error('Profile error:', profileError)
        router.push('/auth/login')
        return
      }

      if (profileData.user_type !== 'classroom_owner') {
        router.push('/')
        return
      }

      setProfile(profileData)

      // Load classroom (only one)
      const { data: classroomData } = await supabase
        .from('classrooms')
        .select('*')
        .eq('owner_id', user.id)
        .maybeSingle()

      if (classroomData) {
        setClassroom(classroomData)
        
        // 決済状況をチェック
        const { data: subscription } = await supabase
          .from('subscriptions')
          .select('status, current_period_end')
          .eq('classroom_id', classroomData.id)
          .eq('status', 'active')
          .maybeSingle()

        const isActive = subscription && 
          subscription.status === 'active' && 
          new Date(subscription.current_period_end) > new Date()

        setPaymentStatus({
          isActive: !!isActive,
          currentPeriodEnd: subscription?.current_period_end || null,
          status: subscription?.status || null
        })
      }

    } catch (error) {
      console.error('Error checking user:', error)
      router.push('/auth/login')
    } finally {
      setLoading(false)
    }
  }

  const toggleClassroomVisibility = async (newStatus: 'published' | 'draft') => {
    if (!classroom) return

    setUpdating(true)
    try {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) {
        throw new Error('No session')
      }

      const response = await fetch(`/api/classrooms/${classroom.id}/toggle-visibility`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session.access_token}`
        },
        body: JSON.stringify({ status: newStatus })
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || 'Failed to update status')
      }

      // ローカル状態を更新
      setClassroom((prev: any) => ({ ...prev, status: newStatus }))
      alert(result.message)

    } catch (error) {
      console.error('Error updating classroom status:', error)
      alert(error instanceof Error ? error.message : 'ステータス更新に失敗しました。')
    } finally {
      setUpdating(false)
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

  return (
    <>
      {/* Page Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">教室情報管理</h1>
          <p className="text-gray-600 mt-2">おかえりなさい、{profile?.full_name || 'さん'}</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Progress Steps */}
        <ProgressSteps 
          hasClassroom={!!classroom}
          hasActiveSubscription={!!paymentStatus?.isActive}
          hasPublishedClassroom={classroom?.status === 'published'}
        />

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 rounded-md bg-orange-100">
                <School className="h-8 w-8 text-orange-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">教室ステータス</p>
                <p className="text-2xl font-semibold text-gray-900">
                  {classroom ? (
                    classroom.status === 'published' ? '公開中' :
                    classroom.status === 'draft' ? '下書き' : '審査中'
                  ) : '未登録'}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 rounded-md bg-green-100">
                <DollarSign className="h-8 w-8 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">決済状況</p>
                <p className="text-2xl font-semibold text-gray-900">
                  {paymentStatus?.isActive ? '決済済み（公開可能）' : '未決済（公開不可）'}
                </p>
                {paymentStatus?.isActive && paymentStatus.currentPeriodEnd && (
                  <p className="text-xs text-gray-500">
                    次回更新: {new Date(paymentStatus.currentPeriodEnd).toLocaleDateString()}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Classroom Status */}
        <div className="bg-white rounded-lg shadow mb-8">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">教室情報</h2>
          </div>
          <div className="p-6">
            {!classroom ? (
              <div className="text-center py-8">
                <School className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500 mb-4">まだ教室が登録されていません</p>
                <p className="text-sm text-gray-400 mb-6">教室情報を登録して、生徒の募集を開始しましょう</p>
                <Link
                  href="/dashboard/classrooms/new"
                  className="bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600 transition-colors inline-flex items-center space-x-2"
                >
                  <Plus className="h-5 w-5" />
                  <span>教室を登録</span>
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">{classroom.name}</h3>
                    <p className="text-sm text-gray-600">
                      {classroom.prefecture} {classroom.city}
                    </p>
                    <div className="flex items-center mt-2 space-x-2">
                      <span className={`inline-block px-3 py-1 text-sm rounded-full ${
                        classroom.status === 'published' 
                          ? 'bg-green-100 text-green-800'
                          : classroom.status === 'payment_required'
                          ? 'bg-red-100 text-red-800'
                          : classroom.status === 'draft'
                          ? 'bg-gray-100 text-gray-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {classroom.status === 'published' ? '公開中' :
                         classroom.status === 'payment_required' ? '決済待ち' :
                         classroom.status === 'draft' ? '下書き' : '審査中'}
                      </span>
                      
                      {/* 公開・非公開ボタン */}
                      {classroom.status !== 'payment_required' && (
                        <div className="flex space-x-2">
                          {classroom.status === 'draft' ? (
                            <button
                              onClick={() => toggleClassroomVisibility('published')}
                              disabled={updating}
                              className="px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
                            >
                              {updating ? '更新中...' : '公開する'}
                            </button>
                          ) : classroom.status === 'published' ? (
                            <button
                              onClick={() => toggleClassroomVisibility('draft')}
                              disabled={updating}
                              className="px-3 py-1 text-sm bg-gray-500 text-white rounded hover:bg-gray-600 disabled:opacity-50"
                            >
                              {updating ? '更新中...' : '非公開にする'}
                            </button>
                          ) : null}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    {classroom.status === 'published' && (
                      <Link
                        href={`/classrooms/${classroom.id}`}
                        className="text-blue-600 hover:text-blue-700 text-sm flex items-center space-x-1"
                        target="_blank"
                      >
                        <span>公開ページを見る</span>
                      </Link>
                    )}
                    <Link
                      href={`/dashboard/classrooms/${classroom.id}/edit`}
                      className="text-orange-600 hover:text-orange-700 text-sm flex items-center space-x-1"
                    >
                      <Edit className="h-4 w-4" />
                      <span>編集</span>
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">メニュー</h2>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {!classroom ? (
                <Link
                  href="/dashboard/classrooms/new"
                  className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <Plus className="h-8 w-8 text-orange-500 mr-3" />
                  <div>
                    <h3 className="font-medium text-gray-900">教室を登録</h3>
                    <p className="text-sm text-gray-600">教室情報を登録して募集を開始</p>
                  </div>
                </Link>
              ) : (
                <Link
                  href={`/dashboard/classrooms/${classroom.id}/edit`}
                  className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <Edit className="h-8 w-8 text-orange-500 mr-3" />
                  <div>
                    <h3 className="font-medium text-gray-900">教室情報を編集</h3>
                    <p className="text-sm text-gray-600">教室の詳細情報を更新</p>
                  </div>
                </Link>
              )}

              <Link
                href="/dashboard/subscription"
                className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <CreditCard className="h-8 w-8 text-blue-500 mr-3" />
                <div>
                  <h3 className="font-medium text-gray-900">掲載料金管理</h3>
                  <p className="text-sm text-gray-600">月額掲載料の支払いと教室公開設定</p>
                </div>
              </Link>
            </div>
          </div>
        </div>

        {/* Payment Info Section */}
        {!paymentStatus?.isActive && (
          <div className="mt-8 bg-orange-50 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-orange-900 mb-2">教室公開のお知らせ</h3>
            <p className="text-orange-800 text-sm mb-3">
              教室を検索結果に表示するには、月額500円の掲載料金のお支払いが必要です。
            </p>
            <div className="flex items-center space-x-4">
              <Link
                href="/dashboard/subscription"
                className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition-colors text-sm"
              >
                掲載料金の支払い手続きを開始
              </Link>
              <p className="text-xs text-orange-700">
                ※ 支払い完了後、手動で教室を公開できるようになります
              </p>
            </div>
          </div>
        )}

        {/* Info Section */}
        <div className="mt-8 bg-blue-50 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-2">お問い合わせについて</h3>
          <p className="text-blue-800 text-sm">
            生徒さんからのお問い合わせは、教室情報に登録されたメールアドレス宛に直接送信されます。
            ダッシュボードでは問い合わせの管理は行われませんので、メールをご確認ください。
          </p>
        </div>
      </div>
    </>
  )
} 