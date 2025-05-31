'use client'

import { useState } from 'react'
import { MapPin, Star, Users, MessageCircle, Lock, Instagram, Youtube, Heart, Share2, Mail } from 'lucide-react'

interface Business {
  id: string
  name: string
  description: string
  category: string
  location: string
  rating: number
  followers: string
  platforms: string[]
  image: string
  isTopRated: boolean
  isRecent: boolean
}

interface BusinessCardProps {
  business: Business
  viewMode: 'grid' | 'list'
  isLoggedIn: boolean
  onBusinessClick: (businessId: string) => void
  onEmailBusiness: (businessId: string) => void
}

export default function BusinessCard({ business, viewMode, isLoggedIn, onBusinessClick, onEmailBusiness }: BusinessCardProps) {
  const [showFullDescription, setShowFullDescription] = useState(false)
  const [isLiked, setIsLiked] = useState(false)
  const [showLoginPrompt, setShowLoginPrompt] = useState(false)

  const handleMessage = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (!isLoggedIn) {
      setShowLoginPrompt(true)
      setTimeout(() => setShowLoginPrompt(false), 3000)
      return
    }
    onEmailBusiness(business.id)
  }

  const handleReadMore = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (!isLoggedIn) {
      setShowLoginPrompt(true)
      setTimeout(() => setShowLoginPrompt(false), 3000)
      return
    }
    setShowFullDescription(!showFullDescription)
  }

  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (!isLoggedIn) {
      setShowLoginPrompt(true)
      setTimeout(() => setShowLoginPrompt(false), 3000)
      return
    }
    setIsLiked(!isLiked)
  }

  const handleCardClick = () => {
    onBusinessClick(business.id)
  }

  const getPlatformIcon = (platform: string) => {
    switch (platform.toLowerCase()) {
      case 'instagram':
        return <Instagram className="w-4 h-4" />
      case 'youtube':
        return <Youtube className="w-4 h-4" />
      case 'tiktok':
        return <div className="w-4 h-4 bg-black rounded-sm flex items-center justify-center text-white text-xs font-bold">T</div>
      case 'telegram':
        return <div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs">t</div>
      case 'linkedin':
        return <div className="w-4 h-4 bg-blue-700 rounded-sm flex items-center justify-center text-white text-xs font-bold">in</div>
      case 'pinterest':
        return <div className="w-4 h-4 bg-red-600 rounded-full flex items-center justify-center text-white text-xs">P</div>
      default:
        return <div className="w-4 h-4 bg-gray-400 rounded-sm"></div>
    }
  }

  const truncatedDescription = business.description.length > 120 
    ? `${business.description.substring(0, 120)}...` 
    : business.description

  if (viewMode === 'list') {
    return (
      <div 
        className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow duration-300 relative cursor-pointer"
        onClick={handleCardClick}
      >
        {showLoginPrompt && (
          <div className="absolute top-4 right-4 bg-red-100 border border-red-300 text-red-700 px-3 py-2 rounded-lg text-sm z-10">
            Please login to interact
          </div>
        )}
        
        <div className="flex gap-6">
          {/* Image */}
          <div className="relative w-32 h-24 flex-shrink-0">
            <img
              src={business.image}
              alt={business.name}
              className="w-full h-full object-cover rounded-lg"
            />
            {business.isTopRated && (
              <div className="absolute -top-2 -right-2 bg-yellow-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                TOP
              </div>
            )}
            {business.isRecent && (
              <div className="absolute -top-2 -left-2 bg-green-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                NEW
              </div>
            )}
          </div>

          {/* Content */}
          <div className="flex-1">
            <div className="flex items-start justify-between mb-2">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1">{business.name}</h3>
                <span className="inline-block bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded-full">
                  {business.category}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={handleLike}
                  className={`p-2 rounded-full ${isLiked ? 'text-red-500' : 'text-gray-400'} hover:bg-gray-100 transition-colors duration-200`}
                >
                  <Heart className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} />
                </button>
                <button className="p-2 rounded-full text-gray-400 hover:bg-gray-100 transition-colors duration-200">
                  <Share2 className="w-5 h-5" />
                </button>
              </div>
            </div>

            <p className="text-gray-600 text-sm mb-3">
              {showFullDescription ? business.description : truncatedDescription}
              {business.description.length > 120 && (
                <button
                  onClick={handleReadMore}
                  className="text-purple-600 hover:text-purple-700 ml-1 font-medium inline-flex items-center"
                >
                  {showFullDescription ? 'Show less' : 'Read more'}
                  {!isLoggedIn && <Lock className="w-3 h-3 ml-1" />}
                </button>
              )}
            </p>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4 text-sm text-gray-500">
                <div className="flex items-center">
                  <MapPin className="w-4 h-4 mr-1" />
                  {business.location}
                </div>
                <div className="flex items-center">
                  <Star className="w-4 h-4 mr-1 text-yellow-500" />
                  {business.rating}
                </div>
                <div className="flex items-center">
                  <Users className="w-4 h-4 mr-1" />
                  {business.followers}
                </div>
              </div>

              <div className="flex items-center space-x-3">
                {/* Platforms */}
                <div className="flex items-center space-x-1">
                  {business.platforms.slice(0, 3).map((platform, index) => (
                    <div key={index} className="p-1 bg-gray-100 rounded">
                      {getPlatformIcon(platform)}
                    </div>
                  ))}
                  {business.platforms.length > 3 && (
                    <span className="text-xs text-gray-500">+{business.platforms.length - 3}</span>
                  )}
                </div>

                {/* Message Button */}
                <button
                  onClick={handleMessage}
                  className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors duration-200 flex items-center text-sm font-medium"
                >
                  {!isLoggedIn && <Lock className="w-4 h-4 mr-1" />}
                  <Mail className="w-4 h-4 mr-1" />
                  Contact
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Grid view
  return (
    <div 
      className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300 relative cursor-pointer flex flex-col h-full"
      onClick={handleCardClick}
    >
      {showLoginPrompt && (
        <div className="absolute top-4 right-4 bg-red-100 border border-red-300 text-red-700 px-3 py-2 rounded-lg text-sm z-10">
          Please login to interact
        </div>
      )}
      
      {/* Image */}
      <div className="relative h-48 flex-shrink-0">
        <img
          src={business.image}
          alt={business.name}
          className="w-full h-full object-cover"
        />
        {business.isTopRated && (
          <div className="absolute top-3 left-3 bg-yellow-500 text-white px-3 py-1 rounded-full text-xs font-bold">
            TOP RATED
          </div>
        )}
        {business.isRecent && (
          <div className="absolute top-3 right-3 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-bold">
            NEW
          </div>
        )}
        
        {/* Action buttons overlay */}
        <div className="absolute top-3 right-3 flex space-x-2">
          {!business.isRecent && (
            <>
              <button
                onClick={handleLike}
                className={`p-2 rounded-full bg-white/90 backdrop-blur-sm ${isLiked ? 'text-red-500' : 'text-gray-600'} hover:bg-white transition-colors duration-200`}
              >
                <Heart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
              </button>
              <button className="p-2 rounded-full bg-white/90 backdrop-blur-sm text-gray-600 hover:bg-white transition-colors duration-200">
                <Share2 className="w-4 h-4" />
              </button>
            </>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-grow">
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-lg font-semibold text-gray-900">{business.name}</h3>
          <span className="inline-block bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded-full">
            {business.category}
          </span>
        </div>

        <p className="text-gray-600 text-sm mb-4 flex-grow">
          {showFullDescription ? business.description : truncatedDescription}
          {business.description.length > 120 && (
            <button
              onClick={handleReadMore}
              className="text-purple-600 hover:text-purple-700 ml-1 font-medium inline-flex items-center"
            >
              {showFullDescription ? 'Show less' : 'Read more'}
              {!isLoggedIn && <Lock className="w-3 h-3 ml-1" />}
            </button>
          )}
        </p>

        {/* Stats */}
        <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
          <div className="flex items-center">
            <MapPin className="w-4 h-4 mr-1" />
            {business.location}
          </div>
          <div className="flex items-center">
            <Star className="w-4 h-4 mr-1 text-yellow-500" />
            {business.rating}
          </div>
          <div className="flex items-center">
            <Users className="w-4 h-4 mr-1" />
            {business.followers}
          </div>
        </div>

        {/* Platforms */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            {business.platforms.slice(0, 4).map((platform, index) => (
              <div key={index} className="p-2 bg-gray-100 rounded-lg" title={platform}>
                {getPlatformIcon(platform)}
              </div>
            ))}
            {business.platforms.length > 4 && (
              <span className="text-xs text-gray-500 ml-1">+{business.platforms.length - 4}</span>
            )}
          </div>
        </div>

        {/* Message Button */}
        <button
          onClick={handleMessage}
          className="w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition-colors duration-200 flex items-center justify-center font-medium mt-auto"
        >
          {!isLoggedIn && <Lock className="w-4 h-4 mr-2" />}
          <Mail className="w-4 h-4 mr-2" />
          {isLoggedIn ? 'Send Message' : 'Login to Contact'}
        </button>
      </div>
    </div>
  )
}