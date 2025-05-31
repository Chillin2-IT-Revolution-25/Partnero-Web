'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Navbar from '@/components/Navbar'
import BusinessList from '@/components/BusinessList'
import ProfileModal from '@/components/ProfileModal'
import EmailModal from '@/components/EmailModal'

export default function BrowsePage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [showProfileModal, setShowProfileModal] = useState(false)
  const [showEmailModal, setShowEmailModal] = useState(false)
  const [selectedBusinessId, setSelectedBusinessId] = useState<string | null>(null)
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

  const handleBusinessClick = (businessId: string) => {
    router.push(`/business/${businessId}`)
  }

  const handleEmailBusiness = (businessId: string) => {
    setSelectedBusinessId(businessId)
    setShowEmailModal(true)
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
      
      <BusinessList 
        isLoggedIn={isLoggedIn}
        onBusinessClick={handleBusinessClick}
        onEmailBusiness={handleEmailBusiness}
      />
      
      {showProfileModal && (
        <ProfileModal 
          user={user}
          onClose={() => setShowProfileModal(false)}
          onLogout={handleLogout}
        />
      )}

      {showEmailModal && selectedBusinessId && (
        <EmailModal 
          businessId={selectedBusinessId}
          onClose={() => {
            setShowEmailModal(false)
            setSelectedBusinessId(null)
          }}
          isLoggedIn={isLoggedIn}
        />
      )}
    </div>
  )
}