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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-purple-50 flex items-center justify-center p-4">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-100 rounded-full mix-blend-multiply filter blur-xl opacity-70"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-pink-100 rounded-full mix-blend-multiply filter blur-xl opacity-70"></div>
      </div>

      <div className="relative text-center max-w-2xl mx-auto">
        {/* Logo */}
        <div className="mb-8">
          <Link href="/" className="inline-flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-lg">P</span>
            </div>
            <span className="text-2xl font-bold text-gray-900">Partnero</span>
          </Link>
        </div>

        {/* 404 Illustration */}
        <div className="mb-8">
          <div className="relative">
            <div className="text-8xl md:text-9xl font-bold text-gray-200 select-none">
              404
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-24 h-24 bg-purple-100 rounded-full flex items-center justify-center">
                <AlertCircle className="w-12 h-12 text-purple-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Error Message */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Oops! Page Not Found
          </h1>
          <p className="text-lg text-gray-600 mb-6">
            The page you're looking for seems to have wandered off into the digital void. 
            Don't worry, even the best partnerships sometimes take unexpected detours!
          </p>
          
          {/* Auto-redirect notice */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-8 inline-block">
            <div className="flex items-center text-blue-800">
              <div className="w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mr-3"></div>
              <span className="text-sm">
                Automatically redirecting to home page in <strong>{countdown}</strong> seconds...
              </span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
          <button
            onClick={handleGoHome}
            className="bg-purple-600 text-white px-8 py-4 rounded-lg hover:bg-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center group font-medium"
          >
            <Home className="w-5 h-5 mr-2" />
            Go to Homepage
          </button>
          
          <button
            onClick={handleGoBack}
            className="border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-lg hover:border-gray-400 hover:bg-gray-50 transition-all duration-300 flex items-center font-medium"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Go Back
          </button>
        </div>

        {/* Helpful Links */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">
            While you're here, check out these popular pages:
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link
              href="/"
              className="p-4 border border-gray-200 rounded-lg hover:border-purple-300 hover:bg-purple-50 transition-colors duration-200 group"
            >
              <div className="flex items-center mb-2">
                <Home className="w-5 h-5 text-purple-600 mr-2" />
                <span className="font-medium text-gray-900 group-hover:text-purple-700">Home</span>
              </div>
              <p className="text-sm text-gray-600">
                Discover the power of partnerships
              </p>
            </Link>

            <Link
              href="/browse"
              className="p-4 border border-gray-200 rounded-lg hover:border-purple-300 hover:bg-purple-50 transition-colors duration-200 group"
            >
              <div className="flex items-center mb-2">
                <Search className="w-5 h-5 text-purple-600 mr-2" />
                <span className="font-medium text-gray-900 group-hover:text-purple-700">Browse Partners</span>
              </div>
              <p className="text-sm text-gray-600">
                Find businesses and creators to collaborate with
              </p>
            </Link>

            <Link
              href="/auth/signup"
              className="p-4 border border-gray-200 rounded-lg hover:border-purple-300 hover:bg-purple-50 transition-colors duration-200 group"
            >
              <div className="flex items-center mb-2">
                <div className="w-5 h-5 bg-purple-600 rounded-full mr-2"></div>
                <span className="font-medium text-gray-900 group-hover:text-purple-700">Sign Up</span>
              </div>
              <p className="text-sm text-gray-600">
                Join the partnership revolution
              </p>
            </Link>
          </div>
        </div>

        {/* Fun Facts */}
        <div className="text-center">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Fun Fact While You Wait
          </h3>
          <div className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-lg p-6">
            <p className="text-purple-800 font-medium">
              🤝 Over 2,500 successful partnerships have been formed on Partnero!
            </p>
            <p className="text-purple-600 text-sm mt-2">
              Join our community and find your perfect collaboration partner today.
            </p>
          </div>
        </div>

        {/* Error Code */}
        <div className="mt-8 text-center">
          <p className="text-gray-400 text-sm">
            Error 404 • Page Not Found • Partnero Platform
          </p>
        </div>
      </div>
    </div>
  )
}