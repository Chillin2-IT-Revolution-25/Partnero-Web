'use client'

import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { useState, useEffect } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import ProfileModal from '@/components/ProfileModal'

const inter = Inter({ subsets: ['latin'] })

interface User {
  name: string
  email: string
  avatar: string
  business: {
    name: string
    description: string
    location: string
    category: string
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [showProfileModal, setShowProfileModal] = useState(false)
  const [user, setUser] = useState<User>({
    name: 'John Doe',
    email: 'john@example.com',
    avatar: '/api/placeholder/40/40',
    business: {
      name: 'Creative Solutions',
      description: 'Digital marketing and content creation services',
      location: 'New York, NY',
      category: 'Digital Marketing'
    }
  })

  const pathname = usePathname()
  const router = useRouter()

  // Pages that should not show header/footer (auth pages)
  const hideHeaderFooter = pathname?.startsWith('/auth/') || false

  // Check for authentication on mount
  useEffect(() => {
    const authData = localStorage.getItem('partnero_auth')
    if (authData) {
      try {
        const parsedData = JSON.parse(authData)
        if (parsedData.isLoggedIn) {
          setIsLoggedIn(true)
          setUser(parsedData.user)
        }
      } catch (error) {
        console.error('Error parsing auth data:', error)
      }
    }
  }, [])

  const handleLogin = () => {
    setIsLoggedIn(true)
  }

  const handleLogout = () => {
    setIsLoggedIn(false)
    setShowProfileModal(false)
    // Clear auth data from localStorage
    localStorage.removeItem('partnero_auth')
  }

  const handleProfileClick = () => {
    setShowProfileModal(true)
  }

  const handleBrowseClick = () => {
    router.push('/browse')
  }

  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        <div className="min-h-screen flex flex-col">
          {/* Conditionally render Navbar */}
          {!hideHeaderFooter && (
            <Navbar 
              isLoggedIn={isLoggedIn}
              user={user}
              onLogin={handleLogin}
              onProfileClick={handleProfileClick}
              onLogout={handleLogout}
              onBrowseClick={handleBrowseClick}
            />
          )}

          {/* Main content */}
          <main className="flex-1">
            {children}
          </main>

          {/* Conditionally render Footer */}
          {!hideHeaderFooter && <Footer />}

          {/* Profile Modal */}
          {showProfileModal && !hideHeaderFooter && (
            <ProfileModal 
              user={user}
              onClose={() => setShowProfileModal(false)}
              onLogout={handleLogout}
            />
          )}
        </div>
      </body>
    </html>
  )
}