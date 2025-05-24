import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey)

export interface PaymentStatus {
  isActive: boolean
  currentPeriodEnd: string | null
  status: string | null
}

export interface PaymentPlan {
  id: string
  name: string
  price_monthly: number
  description: string
  features: string[]
}

/**
 * 教室の決済状況をチェック
 */
export async function checkPaymentStatus(classroomId: string): Promise<PaymentStatus> {
  const { data: subscription, error } = await supabaseAdmin
    .from('subscriptions')
    .select('status, current_period_end')
    .eq('classroom_id', classroomId)
    .eq('status', 'active')
    .maybeSingle()

  if (error) {
    console.error('Payment status check error:', error)
    return { isActive: false, currentPeriodEnd: null, status: null }
  }

  const isActive = subscription && 
    subscription.status === 'active' && 
    new Date(subscription.current_period_end) > new Date()

  return {
    isActive: !!isActive,
    currentPeriodEnd: subscription?.current_period_end || null,
    status: subscription?.status || null
  }
}

/**
 * 教室の公開可能状況をチェック
 */
export async function canPublishClassroom(classroomId: string): Promise<boolean> {
  const paymentStatus = await checkPaymentStatus(classroomId)
  return paymentStatus.isActive
}

/**
 * 利用可能な料金プランを取得
 */
export async function getPaymentPlans(): Promise<PaymentPlan[]> {
  const { data: plans, error } = await supabaseAdmin
    .from('payment_plans')
    .select('*')
    .eq('is_active', true)
    .order('price_monthly', { ascending: true })

  if (error) {
    console.error('Payment plans fetch error:', error)
    return []
  }

  return plans || []
}

/**
 * 教室の公開状態を更新（決済状況をチェックして）
 */
export async function updateClassroomVisibility(
  classroomId: string, 
  requestedStatus: 'published' | 'draft'
): Promise<{ success: boolean; message: string }> {
  
  // 公開リクエストの場合、決済状況をチェック
  if (requestedStatus === 'published') {
    const canPublish = await canPublishClassroom(classroomId)
    
    if (!canPublish) {
      return {
        success: false,
        message: '教室を公開するには月額掲載料（500円）のお支払いが必要です。'
      }
    }
  }

  // ステータス更新
  const { error } = await supabaseAdmin
    .from('classrooms')
    .update({ 
      status: requestedStatus,
      updated_at: new Date().toISOString()
    })
    .eq('id', classroomId)

  if (error) {
    console.error('Classroom status update error:', error)
    return {
      success: false,
      message: 'ステータス更新に失敗しました。'
    }
  }

  return {
    success: true,
    message: requestedStatus === 'published' ? '教室を公開しました。' : '教室を下書きに戻しました。'
  }
} 