// File path: src/app/page.tsx

'use client'

import { useState } from 'react'
import Navbar from '@/components/Navbar'
import HeroSection from '@/components/HeroSection'
import BusinessList from '@/components/BusinessList'
import ProfileModal from '@/components/ProfileModal'

export default function HomePage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [showProfileModal, setShowProfileModal] = useState(false)
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

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar 
        isLoggedIn={isLoggedIn}
        user={user}
        onLogin={handleLogin}
        onProfileClick={handleProfileClick}
        onLogout={handleLogout}
      />
      
      <HeroSection />
      
      <BusinessList isLoggedIn={isLoggedIn} />
      
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