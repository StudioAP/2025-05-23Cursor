'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { supabase } from '@/lib/supabase-browser'
import { 
  ArrowLeft, 
  CreditCard, 
  Check, 
  AlertCircle,
  Calendar,
  DollarSign
} from 'lucide-react'
export default function SubscriptionPage() {
  const [loading, setLoading] = useState(true)
  const [processing, setProcessing] = useState(false)
  const [classroom, setClassroom] = useState<unknown>(null)
  const [subscription, setSubscription] = useState<unknown>(null)
  const [paymentPlan, setPaymentPlan] = useState<unknown>(null)
  const router = useRouter()

  useEffect(() => {
    checkUserAndLoadData()
  }, [])

  const checkUserAndLoadData = async () => {
    try {
      const { data: { user }, error } = await supabase.auth.getUser()
      
      if (error || !user) {
        router.push('/auth/login')
        return
      }

      // Get user profile
      const { data: profileData } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single()

      if (!profileData || profileData.user_type !== 'classroom_owner') {
        router.push('/')
        return
      }

      // プロファイル情報はチェック済み

      // Get classroom
      const { data: classroomData } = await supabase
        .from('classrooms')
        .select('*')
        .eq('owner_id', user.id)
        .maybeSingle()

      if (classroomData) {
        setClassroom(classroomData)

        // Get subscription
        const { data: subscriptionData } = await supabase
          .from('subscriptions')
          .select('*')
          .eq('classroom_id', classroomData.id)
          .maybeSingle()

        if (subscriptionData) {
          setSubscription(subscriptionData)
        }
      }

      // Get payment plan
      const { data: planData } = await supabase
        .from('payment_plans')
        .select('*')
        .eq('is_active', true)
        .order('price_monthly', { ascending: true })
        .limit(1)
        .single()

      if (planData) {
        setPaymentPlan(planData)
      }

    } catch (error) {
      console.error('Error loading data:', error)
    } finally {
      setLoading(false)
    }
  }

  const startSubscription = async () => {
    if (!classroom || !paymentPlan) return

    setProcessing(true)
    try {
      // 実際のプロダクションではStripeなどの決済システムと連携
      // ここではテスト用のダミー実装
      
      const endDate = new Date()
      endDate.setMonth(endDate.getMonth() + 1)

      const { data: newSubscription, error } = await supabase
        .from('subscriptions')
        .insert([{
          classroom_id: (classroom as any).id,
          stripe_subscription_id: `test_sub_${Date.now()}`,
          stripe_customer_id: `test_cust_${Date.now()}`,
          status: 'active',
          current_period_start: new Date().toISOString(),
          current_period_end: endDate.toISOString()
        }])
        .select()
        .single()

      if (error) throw error

      setSubscription(newSubscription)
      alert('決済が完了しました！教室を公開できるようになりました。')

    } catch (error) {
      console.error('Error starting subscription:', error)
      alert('決済処理に失敗しました。再度お試しください。')
    } finally {
      setProcessing(false)
    }
  }

  const cancelSubscription = async () => {
    if (!subscription || !confirm('本当にサブスクリプションを解約しますか？')) return

    setProcessing(true)
    try {
      const { error } = await supabase
        .from('subscriptions')
        .update({ status: 'cancelled' })
        .eq('id', subscription.id)

      if (error) throw error

      setSubscription({ ...subscription, status: 'cancelled' })
      alert('サブスクリプションを解約しました。')

    } catch (error) {
      console.error('Error cancelling subscription:', error)
      alert('解約処理に失敗しました。')
    } finally {
      setProcessing(false)
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

  const isActive = subscription && 
    subscription.status === 'active' && 
    new Date(subscription.current_period_end) > new Date()

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/dashboard"
            className="inline-flex items-center text-orange-600 hover:text-orange-700 mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            ダッシュボードに戻る
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">掲載料金管理</h1>
          <p className="text-gray-600 mt-2">教室の掲載に必要な月額料金の管理を行います。</p>
        </div>

        {!classroom && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-8">
            <div className="flex items-center">
              <AlertCircle className="h-6 w-6 text-yellow-600 mr-3" />
              <div>
                <h3 className="text-lg font-semibold text-yellow-800">教室情報が未登録です</h3>
                <p className="text-yellow-700 mt-1">
                  決済を開始する前に、まず教室情報を登録してください。
                </p>
                <Link
                  href="/dashboard/classrooms/new"
                  className="mt-3 inline-block bg-yellow-600 text-white px-4 py-2 rounded-lg hover:bg-yellow-700 transition-colors"
                >
                  教室情報を登録
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Current Status */}
        <div className="bg-white rounded-lg shadow mb-8">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">現在の状況</h2>
          </div>
          <div className="p-6">
            <div className="flex items-center mb-4">
              <div className={`p-2 rounded-md ${isActive ? 'bg-green-100' : 'bg-gray-100'}`}>
                <CreditCard className={`h-8 w-8 ${isActive ? 'text-green-600' : 'text-gray-600'}`} />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">掲載ステータス</p>
                <p className="text-2xl font-semibold text-gray-900">
                  {isActive ? '決済済み（公開可能）' : '未決済（公開不可）'}
                </p>
                {isActive && subscription && (
                  <p className="text-sm text-gray-500">
                    次回更新: {new Date(subscription.current_period_end).toLocaleDateString()}
                  </p>
                )}
              </div>
            </div>

            {classroom && (
              <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                <h3 className="font-medium text-gray-900 mb-2">対象教室</h3>
                <p className="text-gray-700">{classroom.name}</p>
                <p className="text-sm text-gray-500">{classroom.prefecture} {classroom.city}</p>
              </div>
            )}
          </div>
        </div>

        {/* Payment Plan */}
        {paymentPlan && (
          <div className="bg-white rounded-lg shadow mb-8">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">掲載料金</h2>
            </div>
            <div className="p-6">
              <div className="border border-gray-200 rounded-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold text-gray-900">{paymentPlan.name}</h3>
                  <div className="text-right">
                    <div className="flex items-center">
                      <DollarSign className="h-6 w-6 text-gray-600" />
                      <span className="text-3xl font-bold text-gray-900">{paymentPlan.price_monthly}</span>
                      <span className="text-gray-600 ml-1">円/月</span>
                    </div>
                  </div>
                </div>
                
                <p className="text-gray-600 mb-4">{paymentPlan.description}</p>
                
                <div className="space-y-2">
                  {paymentPlan.features?.map((feature: string, index: number) => (
                    <div key={index} className="flex items-center">
                      <Check className="h-5 w-5 text-green-500 mr-2" />
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">アクション</h2>
          </div>
          <div className="p-6">
            {!classroom ? (
              <p className="text-gray-500">教室情報を登録してから決済手続きを開始してください。</p>
            ) : !isActive ? (
              <div>
                <h3 className="font-medium text-gray-900 mb-2">掲載料金の支払いを開始する</h3>
                <p className="text-gray-600 mb-4">
                  月額500円の掲載料をお支払いいただくことで、あなたの教室を検索結果に表示できるようになります。
                </p>
                <button
                  onClick={startSubscription}
                  disabled={processing}
                  className="bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600 disabled:opacity-50 transition-colors flex items-center space-x-2"
                >
                  <CreditCard className="h-5 w-5" />
                  <span>{processing ? '処理中...' : '支払いを開始'}</span>
                </button>
                <p className="text-xs text-gray-500 mt-2">
                  ※ これはテスト環境のため、実際の決済は行われません
                </p>
              </div>
            ) : (
              <div>
                <h3 className="font-medium text-gray-900 mb-2">掲載料金管理</h3>
                <p className="text-gray-600 mb-4">
                  現在、掲載料金の支払いが完了しています。教室を公開すると検索結果に表示されます。
                </p>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center text-green-600">
                    <Calendar className="h-5 w-5 mr-2" />
                    <span>次回更新: {subscription && new Date(subscription.current_period_end).toLocaleDateString()}</span>
                  </div>
                </div>
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <button
                    onClick={cancelSubscription}
                    disabled={processing}
                    className="text-red-600 hover:text-red-700 disabled:opacity-50 transition-colors text-sm"
                  >
                    {processing ? '処理中...' : 'サブスクリプションを解約'}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Info Section */}
        <div className="mt-8 bg-blue-50 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-2">ご利用について</h3>
          <div className="text-blue-800 text-sm space-y-2">
            <p>• 月額料金は毎月自動で課金されます</p>
            <p>• 解約はいつでも可能で、解約月の月末まで利用できます</p>
            <p>• 決済が停止されると、教室は自動的に非公開になります</p>
            <p>• 決済再開後は、手動で教室を公開する必要があります</p>
          </div>
        </div>
      </div>
  )
} 