'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Menu, X, Music, Search } from 'lucide-react'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <Music className="h-8 w-8 text-orange-500" />
            <span className="text-xl font-bold text-gray-900">
              ピアノ教室ナビ
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link 
              href="/search" 
              className="flex items-center space-x-1 text-gray-700 hover:text-orange-500 transition-colors"
            >
              <Search className="h-4 w-4" />
              <span>教室を探す</span>
            </Link>
            <Link 
              href="/about" 
              className="text-gray-700 hover:text-orange-500 transition-colors"
            >
              サービスについて
            </Link>
            <Link 
              href="/contact" 
              className="text-gray-700 hover:text-orange-500 transition-colors"
            >
              お問い合わせ
            </Link>
          </nav>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Link 
              href="/auth/login" 
              className="text-gray-700 hover:text-orange-500 transition-colors"
            >
              ログイン
            </Link>
            <Link 
              href="/auth/register" 
              className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition-colors"
            >
              教室を掲載する
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-md text-gray-700 hover:text-orange-500 hover:bg-gray-100"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <div className="flex flex-col space-y-4">
              <Link 
                href="/search" 
                className="flex items-center space-x-2 text-gray-700 hover:text-orange-500 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                <Search className="h-4 w-4" />
                <span>教室を探す</span>
              </Link>
              <Link 
                href="/about" 
                className="text-gray-700 hover:text-orange-500 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                サービスについて
              </Link>
              <Link 
                href="/contact" 
                className="text-gray-700 hover:text-orange-500 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                お問い合わせ
              </Link>
              <hr className="border-gray-200" />
              <Link 
                href="/auth/login" 
                className="text-gray-700 hover:text-orange-500 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                ログイン
              </Link>
              <Link 
                href="/auth/register" 
                className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition-colors text-center"
                onClick={() => setIsMenuOpen(false)}
              >
                教室を掲載する
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  )
} 