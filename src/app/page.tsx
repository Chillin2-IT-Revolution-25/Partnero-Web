'use client'

import { useRouter } from 'next/navigation'
import HeroSection from '@/components/HeroSection'
import { useAuth } from '@/contexts/AuthContext'

export default function HomePage() {
  const router = useRouter()
  const { isLoggedIn, user, logout, updateUser } = useAuth()

  const handleSignUpClick = () => {
    if (isLoggedIn) {
      router.push('/browse')
    }else{
      router.push('/auth/signup')
    }
  }

  return (
    <div className="bg-gray-50">
      <HeroSection onBrowseClick={handleSignUpClick} />
    </div>
  )
}