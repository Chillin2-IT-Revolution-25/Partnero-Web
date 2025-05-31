'use client'

import { useRouter } from 'next/navigation'
import HeroSection from '@/components/HeroSection'

export default function HomePage() {
  const router = useRouter()

  const handleSignUpClick = () => {
    router.push('/auth/signup')
  }

  return (
    <div className="bg-gray-50">
      <HeroSection onBrowseClick={handleSignUpClick} />
    </div>
  )
}