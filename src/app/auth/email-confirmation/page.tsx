'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Mail, RefreshCw, ArrowLeft, CheckCircle } from 'lucide-react'
import { supabase } from '@/lib/supabase-browser'

export default function EmailConfirmationPage() {
  const [email, setEmail] = useState('')
  const [isResending, setIsResending] = useState(false)
  const [resendSuccess, setResendSuccess] = useState(false)
  const [checkingAuth, setCheckingAuth] = useState(false)

  useEffect(() => {
    // URLからemail パラメータを取得
    const params = new URLSearchParams(window.location.search)
    const emailParam = params.get('email')
    if (emailParam) {
      setEmail(emailParam)
    }

    // 認証状態を定期的にチェック
    const checkAuthStatus = async () => {
      setCheckingAuth(true)
      const { data } = await supabase.auth.getSession()
      
      console.log('🔍 メール確認ページ - セッション確認:', data)
      console.log('🔍 ユーザー:', data?.session?.user)
      console.log('🔍 email_confirmed_at:', data?.session?.user?.email_confirmed_at)
      console.log('🔍 ユーザーのメール:', data?.session?.user?.email)
      console.log('🔍 URLパラメータのメール:', email)
      
      // セッションがあり、かつメール確認が完了している場合のみダッシュボードにリダイレクト
      if (data.session?.user?.email_confirmed_at && data.session?.user?.email === email) {
        console.log('✅ メール確認が完了しました。ダッシュボードにリダイレクトします。')
        window.location.href = '/dashboard'
      } else {
        console.log('❌ メール確認待ちまたは条件不一致')
      }
      setCheckingAuth(false)
    }

    const interval = setInterval(checkAuthStatus, 3000) // 3秒ごとにチェック
    return () => clearInterval(interval)
  }, [email])

  const handleResend = async () => {
    if (!email) {
      alert('メールアドレスが見つかりません')
      return
    }

    setIsResending(true)
    const { error } = await supabase.auth.resend({
      type: 'signup',
      email: email
    })

    if (error) {
      alert('再送信に失敗しました: ' + error.message)
    } else {
      setResendSuccess(true)
      setTimeout(() => setResendSuccess(false), 3000)
    }
    setIsResending(false)
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-lg shadow-lg p-8">
          {/* ステップ表示 */}
          <div className="mb-8">
            <div className="flex items-center justify-center space-x-4 mb-4">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-medium">
                  ✓
                </div>
                <span className="ml-2 text-sm text-gray-600">アカウント作成</span>
              </div>
              <div className="w-8 border-t border-gray-300"></div>
              <div className="flex items-center">
                <div className="w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center text-sm font-medium">
                  2
                </div>
                <span className="ml-2 text-sm text-orange-600 font-medium">メール確認</span>
              </div>
              <div className="w-8 border-t border-gray-300"></div>
              <div className="flex items-center">
                <div className="w-8 h-8 bg-gray-300 text-gray-600 rounded-full flex items-center justify-center text-sm font-medium">
                  3
                </div>
                <span className="ml-2 text-sm text-gray-500">教室登録</span>
              </div>
            </div>
          </div>

          {/* メインコンテンツ */}
          <div className="text-center">
            <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Mail className="w-8 h-8 text-orange-500" />
            </div>
            
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              メールアドレスの確認をお願いします 📧
            </h1>
            
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
              <p className="text-blue-800 text-sm">
                <strong>{email || 'ご登録のメールアドレス'}</strong><br />
                に確認メールを送信しました
              </p>
            </div>

            <div className="text-left space-y-4 mb-8">
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="font-medium text-gray-900 mb-2">📋 次の手順</h3>
                <ol className="text-sm text-gray-600 space-y-2">
                  <li className="flex items-start">
                    <span className="bg-orange-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs mr-2 mt-0.5">1</span>
                    受信箱（迷惑メールフォルダも確認）を開く
                  </li>
                  <li className="flex items-start">
                    <span className="bg-orange-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs mr-2 mt-0.5">2</span>
                    「ピアノ教室ナビ」からのメールを探す
                  </li>
                  <li className="flex items-start">
                    <span className="bg-orange-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs mr-2 mt-0.5">3</span>
                    メール内の「確認リンク」をクリック
                  </li>
                  <li className="flex items-start">
                    <span className="bg-green-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs mr-2 mt-0.5">✓</span>
                    自動的に教室登録画面に移動します
                  </li>
                </ol>
              </div>
            </div>

            {/* 認証状態チェック表示 */}
            {checkingAuth && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-4">
                <div className="flex items-center justify-center">
                  <RefreshCw className="w-4 h-4 text-green-600 animate-spin mr-2" />
                  <span className="text-sm text-green-700">確認中...</span>
                </div>
              </div>
            )}

            {/* アクションボタン */}
            <div className="space-y-3">
              <button
                onClick={handleResend}
                disabled={isResending}
                className="w-full flex items-center justify-center px-4 py-3 bg-orange-500 text-white font-medium rounded-lg hover:bg-orange-600 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
              >
                {isResending ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin mr-2" />
                    再送信中...
                  </>
                ) : (
                  <>
                    <Mail className="w-4 h-4 mr-2" />
                    確認メールを再送信
                  </>
                )}
              </button>

              {resendSuccess && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                  <div className="flex items-center justify-center">
                    <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                    <span className="text-sm text-green-700">再送信しました！</span>
                  </div>
                </div>
              )}

              <div className="pt-4 border-t">
                <p className="text-xs text-gray-500 mb-3">
                  間違ったメールアドレスで登録してしまった場合
                </p>
                <Link
                  href="/auth/register"
                  className="inline-flex items-center text-gray-600 hover:text-gray-900 text-sm"
                >
                  <ArrowLeft className="w-4 h-4 mr-1" />
                  新規登録に戻る
                </Link>
              </div>
            </div>

            {/* ヘルプ情報 */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <p className="text-xs text-gray-500">
                メールが届かない場合は、お問い合わせ（
                <Link href="/contact" className="text-orange-600 hover:text-orange-700">
                  contact@piano-navi.com
                </Link>
                ）までご連絡ください。
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 