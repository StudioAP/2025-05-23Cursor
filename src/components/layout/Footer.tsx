import Link from 'next/link'
import { Music } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="flex items-center space-x-2 mb-4">
              <Music className="h-8 w-8 text-orange-500" />
              <span className="text-xl font-bold text-gray-900">
                ピアノ教室ナビ
              </span>
            </Link>
            <p className="text-gray-600 mb-4">
              あなたにぴったりのピアノ教室・リトミック教室を見つけよう。
              全国の教室情報を簡単検索できるプラットフォームです。
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">
              サービス
            </h3>
            <ul className="space-y-2">
              <li>
                <Link href="/search" className="text-gray-600 hover:text-orange-500 transition-colors">
                  教室を探す
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-600 hover:text-orange-500 transition-colors">
                  サービスについて
                </Link>
              </li>
              <li>
                <Link href="/auth/register" className="text-gray-600 hover:text-orange-500 transition-colors">
                  教室を掲載する
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">
              サポート
            </h3>
            <ul className="space-y-2">
              <li>
                <Link href="/contact" className="text-gray-600 hover:text-orange-500 transition-colors">
                  お問い合わせ
                </Link>
              </li>
              <li>
                <Link href="/help" className="text-gray-600 hover:text-orange-500 transition-colors">
                  ヘルプ
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-gray-600 hover:text-orange-500 transition-colors">
                  利用規約
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-gray-600 hover:text-orange-500 transition-colors">
                  プライバシーポリシー
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-200">
          <p className="text-center text-gray-500 text-sm">
            © 2024 ピアノ教室ナビ. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
} 