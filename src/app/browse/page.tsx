'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import BusinessList from '@/components/BusinessList'
import EmailModal from '@/components/EmailModal'

export default function BrowsePage() {
  const [showEmailModal, setShowEmailModal] = useState(false)
  const [selectedBusinessId, setSelectedBusinessId] = useState<string | null>(null)
  const router = useRouter()

  const handleBusinessClick = (businessId: string) => {
    router.push(`/business/${businessId}`)
  }

  const handleEmailBusiness = (businessId: string) => {
    setSelectedBusinessId(businessId)
    setShowEmailModal(true)
  }

  return (
    <div className="bg-gray-50">
      <BusinessList 
        isLoggedIn={true} // This will be checked internally by the component
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
           isLoggedIn={false}
           />
      )}
    </div>
  )
}