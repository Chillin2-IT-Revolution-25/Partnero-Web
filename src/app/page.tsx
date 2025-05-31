'use client'

import { useState, useEffect } from 'react' // Add useEffect
import { useRouter } from 'next/navigation'
import Navbar from '@/components/Navbar'
import HeroSection from '@/components/HeroSection'
import ProfileModal from '@/components/ProfileModal'

export default function HomePage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [showProfileModal, setShowProfileModal] = useState(false)
  const router = useRouter()
  const [user, setUser] = useState({
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

  // Add this useEffect to check for auth data on component mount
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
  }

  const handleProfileClick = () => {
    setShowProfileModal(true)
  }

  const handleBrowseClick = () => {
    router.push('/browse')
  }

  const handleSignUpclick = () => {
    router.push('/auth/signup')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar 
        isLoggedIn={isLoggedIn}
        user={user}
        onLogin={handleLogin}
        onProfileClick={handleProfileClick}
        onLogout={handleLogout}
        onBrowseClick={handleBrowseClick}
      />
      
      <HeroSection onBrowseClick={handleSignUpclick} />
      
      {showProfileModal && (
        <ProfileModal 
          user={user}
          onClose={() => setShowProfileModal(false)}
          onLogout={handleLogout}
        />
      )}
    </div>
  )
}