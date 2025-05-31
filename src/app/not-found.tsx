'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Home, ArrowLeft, Search, AlertCircle } from 'lucide-react'

export default function NotFound() {
  const router = useRouter()
  const [countdown, setCountdown] = useState(10)

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          router.push('/')
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [router])

  const handleGoHome = () => {
    router.push('/')
  }

  const handleGoBack = () => {
    router.back()
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#CACA78]/10 via-[#CACA78]/5 to-[#9A9A4A]/15 flex items-center justify-center p-4">
      {/* Add Google Fonts */}
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=K2D:wght@400;700;800&family=Lato:wght@400;700&display=swap');
      `}</style>

      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-[#CACA78]/30 rounded-full mix-blend-multiply filter blur-xl opacity-70"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-[#9A9A4A]/20 rounded-full mix-blend-multiply filter blur-xl opacity-70"></div>
      </div>

      <div className="relative text-center max-w-2xl mx-auto">
        {/* Logo */}
        <div className="mb-8">
          <Link href="/" className="inline-flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-r from-[#9A9A4A] to-[#CACA78] rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-lg" style={{ fontFamily: 'K2D, sans-serif' }}>P</span>
            </div>
            <span className="text-2xl font-bold text-gray-900" style={{ fontFamily: 'K2D, sans-serif' }}>Partnero</span>
          </Link>
        </div>

        {/* 404 Illustration */}
        <div className="mb-8">
          <div className="relative">
            <div className="text-8xl md:text-9xl font-bold text-gray-200 select-none" style={{ fontFamily: 'K2D, sans-serif' }}>
              404
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-24 h-24 bg-[#CACA78]/20 rounded-full flex items-center justify-center">
                <AlertCircle className="w-12 h-12 text-[#9A9A4A]" />
              </div>
            </div>
          </div>
        </div>

        {/* Error Message */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4" style={{ fontFamily: 'K2D, sans-serif' }}>
            Oops! Page Not Found
          </h1>
          <p className="text-lg text-gray-600 mb-6" style={{ fontFamily: 'Lato, sans-serif' }}>
            The page you're looking for seems to have wandered off into the digital void. 
            Don't worry, even the best partnerships sometimes take unexpected detours!
          </p>
          
          {/* Auto-redirect notice */}
          <div className="bg-[#CACA78]/10 border border-[#CACA78]/30 rounded-lg p-4 mb-8 inline-block">
            <div className="flex items-center text-[#8A8A3A]">
              <div className="w-6 h-6 border-2 border-[#9A9A4A] border-t-transparent rounded-full animate-spin mr-3"></div>
              <span className="text-sm" style={{ fontFamily: 'Lato, sans-serif' }}>
                Automatically redirecting to home page in <strong>{countdown}</strong> seconds...
              </span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
          <button
            onClick={handleGoHome}
            className="bg-[#9A9A4A] text-white px-8 py-4 rounded-lg hover:bg-[#8A8A3A] transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center group font-medium"
            style={{ fontFamily: 'Lato, sans-serif' }}
          >
            <Home className="w-5 h-5 mr-2" />
            Go to Homepage
          </button>
          
          <button
            onClick={handleGoBack}
            className="border-2 border-[#CACA78] text-[#8A8A3A] px-8 py-4 rounded-lg hover:border-[#9A9A4A] hover:bg-[#CACA78]/10 transition-all duration-300 flex items-center font-medium"
            style={{ fontFamily: 'Lato, sans-serif' }}
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Go Back
          </button>
        </div>

        {/* Helpful Links */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-6" style={{ fontFamily: 'K2D, sans-serif' }}>
            While you're here, check out these popular pages:
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link
              href="/"
              className="p-4 border border-gray-200 rounded-lg hover:border-[#CACA78] hover:bg-[#CACA78]/10 transition-colors duration-200 group"
            >
              <div className="flex items-center mb-2">
                <Home className="w-5 h-5 text-[#9A9A4A] mr-2" />
                <span className="font-medium text-gray-900 group-hover:text-[#8A8A3A]" style={{ fontFamily: 'Lato, sans-serif' }}>Home</span>
              </div>
              <p className="text-sm text-gray-600" style={{ fontFamily: 'Lato, sans-serif' }}>
                Discover the power of partnerships
              </p>
            </Link>

            <Link
              href="/browse"
              className="p-4 border border-gray-200 rounded-lg hover:border-[#CACA78] hover:bg-[#CACA78]/10 transition-colors duration-200 group"
            >
              <div className="flex items-center mb-2">
                <Search className="w-5 h-5 text-[#9A9A4A] mr-2" />
                <span className="font-medium text-gray-900 group-hover:text-[#8A8A3A]" style={{ fontFamily: 'Lato, sans-serif' }}>Browse Partners</span>
              </div>
              <p className="text-sm text-gray-600" style={{ fontFamily: 'Lato, sans-serif' }}>
                Find businesses and creators to collaborate with
              </p>
            </Link>

            <Link
              href="/auth/signup"
              className="p-4 border border-gray-200 rounded-lg hover:border-[#CACA78] hover:bg-[#CACA78]/10 transition-colors duration-200 group"
            >
              <div className="flex items-center mb-2">
                <div className="w-5 h-5 bg-[#9A9A4A] rounded-full mr-2"></div>
                <span className="font-medium text-gray-900 group-hover:text-[#8A8A3A]" style={{ fontFamily: 'Lato, sans-serif' }}>Sign Up</span>
              </div>
              <p className="text-sm text-gray-600" style={{ fontFamily: 'Lato, sans-serif' }}>
                Join the partnership revolution
              </p>
            </Link>
          </div>
        </div>

        {/* Fun Facts */}
        <div className="text-center">
          <h3 className="text-lg font-semibold text-gray-900 mb-4" style={{ fontFamily: 'K2D, sans-serif' }}>
            Fun Fact While You Wait
          </h3>
          <div className="bg-gradient-to-r from-[#CACA78]/20 to-[#9A9A4A]/20 rounded-lg p-6">
            <p className="text-[#8A8A3A] font-medium" style={{ fontFamily: 'Lato, sans-serif' }}>
              🤝 Over 2,500 successful partnerships have been formed on Partnero!
            </p>
            <p className="text-[#8A8A3A] text-sm mt-2" style={{ fontFamily: 'Lato, sans-serif' }}>
              Join our community and find your perfect collaboration partner today.
            </p>
          </div>
        </div>

        {/* Error Code */}
        <div className="mt-8 text-center">
          <p className="text-gray-400 text-sm" style={{ fontFamily: 'Lato, sans-serif' }}>
            Error 404 • Page Not Found • Partnero Platform
          </p>
        </div>
      </div>
    </div>
  )
}