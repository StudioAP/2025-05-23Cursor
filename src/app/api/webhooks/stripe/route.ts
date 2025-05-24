import { headers } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { supabaseAdmin } from '@/lib/supabase-server'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-04-30.basil'
})

const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!

export async function POST(req: NextRequest) {
  const body = await req.text()
  const headersList = await headers()
  const signature = headersList.get('stripe-signature')

  if (!signature) {
    console.error('Stripe signature missing')
    return NextResponse.json({ error: 'No signature' }, { status: 400 })
  }

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(body, signature, endpointSecret)
  } catch (err) {
    console.error('Webhook signature verification failed:', err)
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }

  // Supabaseサービスクライアントを作成（webhookに適している）
  const supabase = createServiceClient()

  try {
    switch (event.type) {
      case 'invoice.payment_succeeded': {
        const invoice = event.data.object as Stripe.Invoice
        const customerId = invoice.customer as string
        // invoiceオブジェクトからsubscriptionを正しく取得
        const subscriptionId = typeof invoice.subscription === 'string' 
          ? invoice.subscription 
          : invoice.subscription?.id || ''

        console.log('Payment succeeded for customer:', customerId)

        if (!subscriptionId) {
          console.warn('No subscription ID found in invoice')
          return NextResponse.json({ received: true })
        }

        // サブスクリプション情報を更新
        const { error } = await supabase
          .from('subscriptions')
          .update({
            status: 'active',
            current_period_start: new Date((invoice.period_start || 0) * 1000).toISOString(),
            current_period_end: new Date((invoice.period_end || 0) * 1000).toISOString(),
            updated_at: new Date().toISOString()
          })
          .eq('stripe_subscription_id', subscriptionId)

        if (error) {
          console.error('Failed to update subscription:', error)
          return NextResponse.json({ error: 'Database update failed' }, { status: 500 })
        }

        break
      }

      case 'invoice.payment_failed': {
        const invoice = event.data.object as Stripe.Invoice
        const subscriptionId = typeof invoice.subscription === 'string' 
          ? invoice.subscription 
          : invoice.subscription?.id || ''

        console.log('Payment failed for subscription:', subscriptionId)

        if (!subscriptionId) {
          console.warn('No subscription ID found in invoice')
          return NextResponse.json({ received: true })
        }

        // サブスクリプション状態を更新
        const { error } = await supabase
          .from('subscriptions')
          .update({
            status: 'past_due',
            updated_at: new Date().toISOString()
          })
          .eq('stripe_subscription_id', subscriptionId)

        if (error) {
          console.error('Failed to update subscription status:', error)
          return NextResponse.json({ error: 'Database update failed' }, { status: 500 })
        }

        break
      }

      case 'customer.subscription.deleted': {
        const subscription = event.data.object as Stripe.Subscription
        const subscriptionId = subscription.id

        console.log('Subscription cancelled:', subscriptionId)

        // サブスクリプション状態を更新
        const { error } = await supabase
          .from('subscriptions')
          .update({
            status: 'cancelled',
            cancelled_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          })
          .eq('stripe_subscription_id', subscriptionId)

        if (error) {
          console.error('Failed to update subscription status:', error)
          return NextResponse.json({ error: 'Database update failed' }, { status: 500 })
        }

        break
      }

      case 'customer.subscription.updated': {
        const subscription = event.data.object as Stripe.Subscription
        const subscriptionId = subscription.id

        console.log('Subscription updated:', subscriptionId)

        // サブスクリプション情報を更新
        const { error } = await supabase
          .from('subscriptions')
          .update({
            status: subscription.status,
            current_period_start: new Date(subscription.current_period_start * 1000).toISOString(),
            current_period_end: new Date(subscription.current_period_end * 1000).toISOString(),
            updated_at: new Date().toISOString()
          })
          .eq('stripe_subscription_id', subscriptionId)

        if (error) {
          console.error('Failed to update subscription:', error)
          return NextResponse.json({ error: 'Database update failed' }, { status: 500 })
        }

        break
      }

      default:
        console.log(`Unhandled event type: ${event.type}`)
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error('Webhook handler error:', error)
    return NextResponse.json({ error: 'Webhook handler failed' }, { status: 500 })
  }
} 