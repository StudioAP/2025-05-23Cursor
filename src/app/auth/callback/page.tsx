'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase-browser'
import { Loader2, CheckCircle, XCircle } from 'lucide-react'

export default function AuthCallbackPage() {
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading')
  const [message, setMessage] = useState('')
  const router = useRouter()

  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        // URLハッシュから認証パラメータを取得
        const { data, error } = await supabase.auth.getSession()
        
        if (error) {
          setStatus('error')
          setMessage('認証の処理中にエラーが発生しました。')
          console.error('Auth callback error:', error)
          return
        }

        if (data.session?.user) {
          // メール確認が完了した場合
          if (data.session.user.email_confirmed_at) {
            setStatus('success')
            setMessage('メール確認が完了しました。ダッシュボードにリダイレクトしています...')
            
            // 3秒後にダッシュボードにリダイレクト
            setTimeout(() => {
              router.push('/dashboard')
            }, 3000)
          } else {
            setStatus('error')
            setMessage('メール確認が完了していません。')
          }
        } else {
          setStatus('error')
          setMessage('認証情報が見つかりません。')
        }
      } catch (err) {
        setStatus('error')
        setMessage('予期しないエラーが発生しました。')
        console.error('Unexpected error:', err)
      }
    }

    handleAuthCallback()
  }, [router])

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-lg shadow-lg p-8 text-center">
          {status === 'loading' && (
            <>
              <Loader2 className="w-12 h-12 text-orange-500 animate-spin mx-auto mb-4" />
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                認証処理中...
              </h2>
              <p className="text-gray-600">
                メール確認を処理しています。しばらくお待ちください。
              </p>
            </>
          )}

          {status === 'success' && (
            <>
              <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                認証完了！
              </h2>
              <p className="text-gray-600 mb-4">
                {message}
              </p>
              <div className="bg-green-50 border border-green-200 rounded-md p-3">
                <p className="text-sm text-green-700">
                  自動的にダッシュボードに移動します...
                </p>
              </div>
            </>
          )}

          {status === 'error' && (
            <>
              <XCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                認証エラー
              </h2>
              <p className="text-gray-600 mb-4">
                {message}
              </p>
              <div className="space-y-3">
                <button
                  onClick={() => router.push('/auth/login')}
                  className="w-full bg-orange-500 text-white py-2 px-4 rounded-md hover:bg-orange-600 transition-colors"
                >
                  ログインページに戻る
                </button>
                <button
                  onClick={() => router.push('/auth/register')}
                  className="w-full bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600 transition-colors"
                >
                  新規登録に戻る
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
} 