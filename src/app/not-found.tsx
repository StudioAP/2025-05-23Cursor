'use client'

import Link from 'next/link'
import { Search, Home, ArrowLeft } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full text-center">
        <div className="mb-8">
          <div className="bg-orange-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
            <Search className="h-10 w-10 text-orange-500" />
          </div>
          <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
          <h2 className="text-2xl font-semibold text-gray-700 mb-3">
            ページが見つかりません
          </h2>
          <p className="text-gray-600 mb-8">
            お探しのページは存在しないか、移動した可能性があります。<br />
            URLを確認していただくか、以下のリンクをご利用ください。
          </p>
        </div>

        <div className="space-y-4">
          <Link
            href="/"
            className="w-full bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600 transition-colors font-medium inline-flex items-center justify-center space-x-2"
          >
            <Home className="h-5 w-5" />
            <span>トップページに戻る</span>
          </Link>
          
          <Link
            href="/search"
            className="w-full bg-white text-orange-600 border-2 border-orange-500 px-6 py-3 rounded-lg hover:bg-orange-50 transition-colors font-medium inline-flex items-center justify-center space-x-2"
          >
            <Search className="h-5 w-5" />
            <span>教室を検索</span>
          </Link>

          <button
            onClick={() => window.history.back()}
            className="w-full bg-gray-100 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-200 transition-colors font-medium inline-flex items-center justify-center space-x-2"
          >
            <ArrowLeft className="h-5 w-5" />
            <span>前のページに戻る</span>
          </button>
        </div>
      </div>
    </div>
  )
}
