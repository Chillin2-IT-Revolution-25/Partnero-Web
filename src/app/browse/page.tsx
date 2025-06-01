'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import BusinessList from '@/components/BusinessList'
import EmailModal from '@/components/EmailModal'
import { useAuth } from '@/contexts/AuthContext'
import { initAOS, refreshAOS } from '@/utils/aosUtils'

export default function BrowsePage() {
  const { isLoggedIn } = useAuth()
  const [showEmailModal, setShowEmailModal] = useState(false)
  const [selectedBusinessId, setSelectedBusinessId] = useState<string | null>(null)
  const router = useRouter()

  // Initialize AOS when the component mounts
  useEffect(() => {
    initAOS()
  }, [])

  // Refresh AOS when the email modal opens or closes
  useEffect(() => {
    refreshAOS()
  }, [showEmailModal])

  const handleBusinessClick = (businessId: string) => {
    router.push(`/business/${businessId}`)
  }

  const handleEmailBusiness = (businessId: string) => {
    setSelectedBusinessId(businessId)
    setShowEmailModal(true)
  }

  return (
    <div className="bg-gray-50" data-aos="fade-up" data-aos-duration="400">
      <BusinessList 
        isLoggedIn={isLoggedIn}
        onBusinessClick={handleBusinessClick}
        onEmailBusiness={handleEmailBusiness}
      />
      
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